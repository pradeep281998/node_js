/*  let chai = require('chai');
let application = require('../src/index');
let expect = require('chai').expect;

var db = require('./../src/model');

var Question = db.questions;
describe('/questions', function () {
  it('should create question table', function (done) {
    Question.create({
    });
    done();
  });
});
var Option = db.options;
describe('/options', function () {
  it('should create option table', function (done) {
    Option.create({
    });
    done();
  });
});
var Coursemodule=db.coursemodules
describe('/modules', function () {
  it('should create modules table', function (done) {
    Coursemodule.create({
    });
    done();
  });
});
var Topic=db.topics
describe('/topics', function () {
  it('should create topic table', function (done) {
   Topic.create({
    });
    done();
  });
});
var Course=db.courses
describe('/Courses', function () {
  it('should create course table', function (done) {
   Course.create({
    });
    done();
  });
});
var Context=db.contexts
describe('/context', function () {
  it('should create context table', function (done) {
   Context.create({
    });
    done();
  });
});
var Tag=db.tags
describe('/tags', function () {
  it('should create tags table', function (done) {
   Tag.create({
    });
    done();
  });
});

describe('/questions', function() {
  it('should display the list of all questions', async function() { 
     await Question.findAll()
  })
}) 

describe('/options', function() {
  it('should display the list of all options', async function() { // notice async and no done
    await Option.findAll()
  })
})

describe('/courses', function() {
  it('should should display the list of all  courses', async function() { // notice async and no done
     await Course.findAll()
  })
})

describe('/contexts', function() {
  it('should should display the list of all context', async function() { // notice async and no done
     await Context.findAll()
  })
})
describe('/tags', function() {
  it('shouldshould display the list of all tags', async function() { 
     await Tag.findAll()
  })
})

/* context('check associations', () => {
  it('defined a belongsTo association with tags model', () => {
    expect(context.belongsTo).to.have.been.calledWith(Tag)
  })
})
 */ 