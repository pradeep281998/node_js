//const req = require("express/lib/request");
const { tags, questions } = require("../model");
const db = require("../model");
const Question = db.questions;
const Option = db.options;
const Coursemodule = db.coursemodules;
const Topic=db.topics;
const Tag=db.tags;
const Course= db.courses;
const Context=db.contexts;  

const contextschema = require('../validators/context.validator');
const questionschema = require('../validators/question.validator');
const coursemoduleschema=require('../validators/coursemodule.validator')
const courseschema=require('../validators/course.validator')

exports.createCourse = (req,res) => {
  const data=req.body
  const result = courseschema.validate(data); 
    if (result.error) {
        res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        data: data
    });
    } 
    else {
 Course.create({
    code: result.value.code,
    name: result.value.name,
    description: result.value.description,
  })
    .then((course) => {
      res.status(200).json([{"course":course}])
    })
    .catch((err) => {
      console.log(">> Error while creating course: ", err);
    });
  }
};

exports.questionfindAll = (req,res) => {
  return Question.findAll({
    where: {},
     include: [{
      model: Option,
      as: 'options',
      attributes: ['description','valid','explanation'],
     }],
    attributes:['id','contextId','title','description','difficulty',
    ['coursemoduleId','modules'],['topicId','topics']]
    //aliases
    , 
    offset:0, 
    limit: 100 
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

exports.findQuestionByPK = (req,res) => {
  const id = req.params.id;
   Question.findByPk(id,{
    include: [{
      model: Option,
      as: 'options',
      attributes: ['description','valid','explanation'],
    }],
    attributes:['id','contextId','title','description','difficulty',
    ['coursemoduleId','modules'],['topicId','topics']] 
    //aliases
  })
    .then((question) => {
       if (question) {
        res.status(200).json(question);
      } 
      else {
        res.status(404).send({
          message: `Cannot find question with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving question with id=" + id
      });
    })
};

exports.findContextByPK = (req,res) => {
  const id = req.params.id;
  return Context.findByPk(id,{
    attributes: {exclude:['questionId']},
     include: [{
      model: tags,
      as: 'tags',
      attributes: ['name']
    }], 
  })
    .then((context) => {
      if (context) {
        res.send(context);
      } else {
        res.status(404).send({
          message: `Cannot find context with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving context with id=" + id
      });
    })
};

exports.ContextfindBytitle = (req,res) => {
 const id=req.params.id
   return Context.findAll({
    where:{title: id},
     include: [{
      model: tags,
      as: 'tags',
      attributes: ['name']
    }], 
  })
  .then((context) => {
    if (context) {
      res.send(context);
    } else {
      res.status(404).send({
        message: `Cannot find context with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving context with id=" + id
    });
});
};
     
exports.ContextfindOne = (req) => {
  const z=req.body.context.title
    const x=Context.findOne({
     where:{title: z},
      include: [{
       model: tags,
       as: 'tags',
       attributes: ['name']
     }], 
   })
     return (x);
 };

exports.findModByPK = (req,res) => {
  const id=req.params.id;
  return Coursemodule.findByPk(id,{
    attributes: {exclude:['questionId']},
     include: [{
      model: Topic,
      as: 'topics',
      attributes: ['name','description']
    }], 
  })
    .then((coursemodule) => {
      if (coursemodule) {
        res.send(coursemodule);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving module with id=" + id
      });
});
};

exports.modulefindAll = (req,res) => {
  return Coursemodule.findAll({
    where: {},
    attributes: {exclude:['questionId']},
    include: [{
      model: Topic,
      as: 'topics',
      attributes: ['id','name','description'],
    }],
    offset:0, 
    limit: 100 
  })
  .then((coursemodule) => {
    if (coursemodule) {
      res.send(coursemodule);
    } else {
      res.status(404).send({
        message: `Cannot find modules.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving"
    });
});
};

exports.Coursefind = (req,res) => {
  const id= req.params.id
  return Course.findAll({
    where:{code : id},
    attributes: {exclude:['questionId']},
  })

  .then((course) => {
    if (course) {
      res.send(course);
    } else {
      res.status(404).send({
        message: `Cannot find course with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving course with id=" + id
    });
});
};

exports.questiondelete = (req, res) => {
  const id = req.params.id;
  Question.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Question was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Question with id=${id}. Maybe Question was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Question with id=" + id
      });
    });
};

exports.coursefindAll = (req,res) => {
  return Course.findAll({
    where: {},
    attributes: {exclude:['questionId']},
    offset:0, 
    limit: 100 
  })
  .then((course) => {
    if (course) {
      res.send(course);
    } else {
      res.status(404).send({
        message: `Cannot find course with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving course with id=" + id
    });
});
};

exports.contextfindAll = (req,res) => {
  return Context.findAll({
    //attributes: {exclude:['questionId']},
    where: {},
     include: [{
      model: Tag,
      as: 'tags',
      attributes: ['id','name'],
     }]
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

exports.contextdelete = (req, res) => {
  const id = req.params.id;
  Context.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "context was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete context with id=${id}. Maybe context was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete context with id=" + id
      });
    });
};

exports.topicdelete = (req, res) => {
  const id = req.params.id;
  Topic.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "topic was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete topic with id=${id}. Maybe topic was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete topic with id=" + id
      });
    });
};

exports.moduledelete = (req, res) => {
  const id = req.params.id;
  Coursemodule.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "module was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete module with id=${id}. Maybe module was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete module with id=" + id
      });
    });
};

exports.coursedelete = (req, res) => {
  const id = req.params.id;
  Course.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "course was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete course with id=${id}. Maybe course was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete course with id=" + id
      });
    });
};

exports.contextupdate = (req, res) => {
  const id = req.params.id;

  Context.update(req.body.context, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Context was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update COntext with id=${id}. Maybe Context was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Context with id=" + id
      });
    });
};

exports.topicupdate = (req, res) => {
  const id = req.params.id;
  Topic.update(req.body.topic, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "topic was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update topic with id=${id}. Maybe topic was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating topic with id=" + id
      });
    });
};

exports.moduleupdate = (req, res) => {
  const id = req.params.id;
  Coursemodule.update(req.body.module, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "module was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update module with id=${id}. Maybe module was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating module with id=" + id
      });
    });
};

exports.courseupdate = (req, res) => {
    const id = req.params.id;
    Course.update(req.body.course, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "course was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update course with id=${id}. Maybe course was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating course with id=" + id
        });
      });
};

exports.questionupdate = (req, res) => {
  const id = req.params.id;
  Question.update(req.body, {
    where: { id: id }})
  Option.update(req.body.option, {
    where: { QuestionId: id }})
    .then(num => {
      if (num == 1) {
        res.send({
          message: "question was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update question with id=${id}. Maybe question was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating question with id=" + id
      });
    });
};


exports.createContext = ( req,res,next) => {
  const data=req.body
  const result = contextschema.validate(data);    
    if (result.error) {
        res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        data: data
    });
    } 
    else {
   Context.create({
    title: result.value.title,
    description:result.value.description
  })
  .then(context => {
    Tag.bulkCreate(result.value.tag)
      .then(()=>{
        Tag.update({contextId:context.id},
          {where:{contextId:null}})
      })
    
    .then(() => { 
    return Tag.findAll({
      where:{contextId: context.id},
    })
  })
      /* {
      name: result.value.name,
      contextId: context.id
    } */
  .then(tag=>{
    res.status(200).json({context,tag})
  })
})
  .catch((err) => {
    console.log(">> Error while creating tag: ", err);
  });
}
};

exports.createCoursemod = (req,res,next) => {
  const data=req.body
  const result = coursemoduleschema.validate(data); 
    if (result.error) {
        res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        data: data
    });
    } 
    else {
      Coursemodule.create({
        name: result.value.name,
      })
 .then(coursemodule => {
   Topic.bulkCreate(
    /*  name: req.body.topic.name,
     description:req.body.topic.description,
     coursemoduleId: coursemodule.id */
   result.value.topic)
   .then(()=>{
    Topic.update({coursemoduleId:coursemodule.id},
      {where:{coursemoduleId:null}})
  })

.then(() => { 
return Topic.findAll({
  where:{coursemoduleId: coursemodule.id},
})
}) 
 .then(topic=>{
 res.status(200).json({coursemodule,topic})
})
})
 .catch((err) => {
   console.log(">> Error while creating tag: ", err);
 });
}
};

exports.createQuestion = (req,res,next) => {
  const data=req.body
    const result = questionschema.validate(data);
    //console.log(result);
    if (result.error) {
        res.status(422).json({
        status: 'error',
        message: 'Invalid request data'});
    } 
    else
    { 
 Context.findOne({
   where:{id: result.value.context},
    include: [{
     model: tags,
     as: 'tags',
     attributes: ['name']
   }], 
 })
.then(context=>{
    Coursemodule.findOne({
        where:{name: result.value.module},
    })
    .then(coursemodule =>{
        Topic.findOne({
          where:{name: result.value.topic}
        })
        .then(topic=>{
          if(context==null||coursemodule==null||topic==null)
          res.json('error while retrieveing context,course,topic or they have not been created')
          else
          {
            Question.create({
              title: req.body.title,
              description: req.body.description,
              difficulty: req.body.difficulty,
              contextId: context.id,
              coursemoduleId: coursemodule.id,
              topicId: topic.id
            })
          .then(question=>{
            /* let questionId=question.id
            console.log(questionId) */
              Option.bulkCreate(req.body.option,
                )  
              .then(()=>{
                Option.update({questionId:question.id},
                  {where:{questionId:null}})
              })

          .then(() => { 
            return Option.findAll({
              where:{questionId: question.id},
              //attributes: ['id','description','valid','explanation']
            })
          }) 
          .then(option=>{
           res.json({question,option})
          })
        })
          }
      })
    })
  })
}
}
