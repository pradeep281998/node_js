const express= require("express");
const sequelize= require('./config');

const controller = require("./controller/questioncontroller");
const contextcontroller = require("./controller/contextcontroller");

sequelize.sync({force:false}).then(() => console.log('database is ready'));

const app= express();
app.use(express.json());


const Validator = require('./middlewares/Validator');


//post question
app.post('/questions',Validator('question'),async (req,res,next) => {
    controller.createQuestion(req, res,next)
})
//get question and options with a key
app.get('/questions/:id',async (req,res) => {
   controller.findQuestionByPK(req, res)
})
//list of all questions along with options,moduleid, topicid
app.get('/questions',async (req,res) => {
    await controller.questionfindAll(req,res)
})
//delete question
app.delete('/question/:id', async (req, res) => {
    controller.questiondelete(req, res)
  });
//update question
app.put('/questions/:id',async (req,res) => {
    controller.questionupdate(req, res)
 })
//add context and tags
app.post('/contexts',Validator('context'),async (req,res,next) => {
    controller.createContext(req, res,next);
})
//get context and tags with a id of title
app.get('/context/:id',async (req,res) => {
     //await controller.findContextByPK(req,res)
     await controller.ContextfindBytitle(req,res)
})
//list of all contexts with tags
app.get('/contexts',async (req,res) => {
    await controller.contextfindAll(req,res)
})
//delete context
app.delete('/contexts/:id', async (req, res) => {
    controller.contextdelete(req, res)
  });
//update context
app.put("/contexts/:id", async (req, res) => {
    controller.contextupdate(req, res)
  });
//create topic
app.post('/topics',async (req,res) => {
     await contextcontroller.createTopic(req.body.topic,res)  
})
//get all topics
app.get('/topics',async (req,res) => {
    await contextcontroller.topicfindAll(req,res);
})
//get topics by id
app.get('/topics/:id',async (req,res) => {
   await contextcontroller.findTopicByPK(req,res);
})
//delete topic by id
app.delete('/topics/:id', async (req, res) => {
    controller.topicdelete(req, res)
  });
//update topic
app.put("/topics/:id", async (req, res) => {
    controller.topicupdate(req, res)
  });
//create modules with topics
app.post('/modules',Validator('coursemodule'),async (req,res,next) => {
    controller.createCoursemod(req, res,next); 
});
//get modules with topics
app.get('/modules/:id',async (req,res) => {
    await controller.findModByPK(req,res)
})
//list of modules with topics
app.get('/modules',async (req,res) => {
    await controller.modulefindAll(req,res);
})
//delete module
app.delete('/modules/:id', async (req, res) => {
    controller.moduledelete(req, res)
  });
  //update module
app.put("/modules/:id", async (req, res) => {
    controller.moduleupdate(req, res)
  });
//create course
app.post('/courses',Validator('course'),async (req,res,next) => {
     await controller.createCourse(req,res,next);
});
//get course with a key of code
app.get('/courses/:id',async (req,res) => {
    await controller.Coursefind(req,res);
})
//list of courses
app.get('/courses',async (req,res) => {
    await controller.coursefindAll(req,res);
})
//delete course
app.delete('/courses/:id', async (req, res) => {
    controller.coursedelete(req, res)
});
//update courses
app.put("/courses/:id", async (req, res) => {
    controller.courseupdate(req, res)
});

if(!module.parent){
app.listen(3800, ()=>{
    console.log('server is running');
})
}

module.exports= app