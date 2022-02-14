const db = require("../model");
const Question = db.questions;
const Option = db.options;
const Coursemodule = db.coursemodules;
const Topic=db.topics;
const Tag=db.tags;
const Course= db.courses;
const Context=db.contexts;

exports.createContext = (context) => {
    return Context.create({
      title: context.title,
      description: context.description,
    })
      .then((context) => {
        console.log(">> Created context: " + JSON.stringify(context, null, 4));
        return context;
      })
      .catch((err) => {
        console.log(">> Error while creating context: ", err);
      });
  };

exports.createTopic = (topic,res) => {
    return Topic.create({
      name: topic.name,
      description: topic.description
    })
      .then((data) => {
        if(data){
          res.send(data)
        };
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating topic."
          });
        }); 
  };

exports.topicfindAll = (req,res) => {
    return Topic.findAll({
      where: {},
      attributes: {exclude:['coursemoduleId']}
    })
    .then((data) => {
      if(data){
        res.send(data)
      };
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving."
        });
      }); 
  };

exports.findTopicByPK = (req,res) => {
    const id=req.params.id
    return Topic.findByPk(id,{
      attributes: {exclude:['coursemoduleId']},
    })
      .then((topic) => {
        if (topic) {
          res.status(200).send(topic);
        } 
      })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "cannot find topic with id"
          });
        }); 
}

exports.CoursefindOne = (req) => {
  const z=req.body.course.code
    const x=Course.findOne({
     where:{code: z}
   })
     return (x);
 };

exports.CoursemodulefindOne = (req) => {
  const z=req.body.modules.name
    const x=Coursemodule.findOne({
     where:{name: z}
   })
     return (x);
 };