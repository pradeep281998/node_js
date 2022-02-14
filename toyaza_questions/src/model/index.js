const { Sequelize }= require('sequelize');
const sequelize= require('../config');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.questions = require("./question.model.js")(sequelize, Sequelize);
db.options = require("./option.model.js")(sequelize, Sequelize);
db.coursemodules = require("./coursemodule.model.js")(sequelize, Sequelize);
db.topics = require("./topic.model.js")(sequelize, Sequelize);
db.courses = require("./course.model.js")(sequelize, Sequelize);
db.contexts = require("./context.model.js")(sequelize, Sequelize);
db.tags=require("./tag.model.js")(sequelize, Sequelize);

db.questions.hasMany(db.options, { as: "options" });
db.options.belongsTo(db.questions, {
  foreignKey: "questionId",
  as: "question",
}); 

db.coursemodules.hasMany(db.questions, { as: "questions" });
db.questions.belongsTo(db.coursemodules, {
  foreignKey: "coursemoduleId",
  as: "coursemodule",
});
db.coursemodules.hasMany(db.topics, { as: "topics" });
db.topics.belongsTo(db.coursemodules, {
  foreignKey: "coursemoduleId",
  as: "coursemodule",
});

db.contexts.hasMany(db.questions, { as: "questions" });
db.questions.belongsTo(db.contexts, {
  foreignKey: "contextId",
  as: "context",
});
db.contexts.hasMany(db.tags, { as: "tags" });
db.tags.belongsTo(db.contexts, {
  foreignKey: "contextId",
  as: "context",
});

/* db.courses.hasMany(db.questions, { as: "questions" });
db.questions.belongsTo(db.courses, {
  foreignKey: "courseId",
  as: "course",
}); */

db.topics.hasMany(db.questions, { as: "questions" });
db.questions.belongsTo(db.topics, {
  foreignKey: "topicId",
  as: "topic",
});
module.exports = db;