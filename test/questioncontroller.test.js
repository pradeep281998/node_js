let chai = require('chai');
let chaiHttp = require('chai-http');
const { Context } = require('mocha');
let server = require('../src/index');
let should = chai.should();

chai.use(chaiHttp);

describe('contexts', () => {
  //get list of contexts
    it('it should GET all the contexts', (done) => {
      chai.request(server)
          .get('/contexts')
          .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
            done();
          });
    });

//create contexts
  it('it should create context', async () => {
    chai.request(server)
        .post('/contexts')
        .send({
          'title': 'Cook Indomie',
          'description': 'hello hi test'
      })
        .send({
          'name': 'gre',
      })
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json; 
              res.body.should.eql('successfully created context and tag');
        });
      });
  it('it should not create context as description is null', async () => {
    chai.request(server)
        .post('/contexts')
        .send({
          'title': 'Cook Indomie',
          'description': ''
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
      });
  });
  it('it should not create context as title is null', async () => {
    chai.request(server)
        .post('/contexts')
        .send({
          'title': '',
          'description': 'hi this is test'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
      });
  });

//delete context with id
  it('it should  delete the context with id', async () => {
    chai.request(server)
        .delete('/contexts/:id')
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
        });
  });
  
  it('it should not delete the context with id', async () => {
    chai.request(server)
        .delete('/contexts/:id')
        .then(function(res) {
          throw new Error('id not matching');
        })
        .catch(function(err) {
          expect(err).to.have.status(204);
        });
  });

//get context with id
  it('it should GET context with id', async () => {
    chai.request(server)
        .get('/context/:id')
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('array');
        });
  });
  it('it should not GET context with id', async () => {
    chai.request(server)
        .get('/context/:id')
        .then(function(res) {
          throw new Error('cannot find context with id');
        })
        .catch(function(err) {
          expect(err).to.have.status(204);
        });
  }); 

//update contexts
it('it should update context', async () => {
  chai.request(server)
      .put('/contexts/:id')
      .send({
        'title': 'Cook Indomie',
        'description': 'hello hi test'
    })
      .send({
        'name': 'gre',
    })
      .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
      });
    });
    it('it should not UPDATE context with id', async () => {
      chai.request(server)
          .put('/contexts/:id')
          .then(function(res) {
            throw new Error('cannot find context with id to update');
          })
          .catch(function(err) {
            expect(err).to.have.status(204);
          });
    }); 
  });

describe('topics', () => {
    //get list of topics
      it('it should GET all the topics', (done) => {
        chai.request(server)
            .get('/topics')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(2);
              done();
            });
      });
      it('it should not GET all the topics', async () => {
        chai.request(server)
            .get('/topics')
            .then(function(res) {
              throw new Error('Some error occurred while retrieving.');
            })
            .catch(function(err) {
              expect(err).to.have.status(500);
            });
      });
  
  //delete topic with id
    it('it should  delete the topic with id', async () => {
      chai.request(server)
          .delete('/topics/:id')
          .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
          });
    });
    
    it('it should not delete the topic with id', async () => {
      chai.request(server)
          .delete('/topics/:id')
          .then(function(res) {
            throw new Error('id not matching');
          })
          .catch(function(err) {
            expect(err).to.have.status(204);
          });
    });
  
  //get topic with id
  it('it should GET topic with id', async () => {
    chai.request(server)
        .get('/topics/:id')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
    });
  });
    it('it should not GET topic with id', async () => {
      chai.request(server)
          .get('/topics/:id')
          .then(function(res) {
            throw new Error('cannot find topic with id');
          })
          .catch(function(err) {
            expect(err).to.have.status(500);
          });
        });
  
  //update topics
  it('it should update topic', async () => {
    chai.request(server)
        .put('/topics/:id')
        .send({
          'name': 'Cook',
          'description': 'hello hi test'
      })
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
        });
      });
      it('it should not UPDATE topic with id', async () => {
        chai.request(server)
            .put('/topics/:id')
            .then(function(res) {
              throw new Error('cannot find topic with id to update');
            })
            .catch(function(err) {
              expect(err).to.have.status(204);
            });
      }); 

//create topic
it('it should create topic', async () => {
  chai.request(server)
      .post('/topics')
      .send({
        'name': 'Time And Distance',
        'description': 'string'
    })
      .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            res.body.should.have.property('description');
            res.body.length.should.be.eql(3);
      });
    });

    it('it should not create topic', async () => {
      chai.request(server)
          .post('/topics')
          .send({
            'name': '',
            'description': 'string'
        })
        .then(function(res) {
          throw new Error('Some error occurred while creating topic.');
        })
        .catch(function(err) {
          expect(err).to.have.status(500);
        });
        });
  });

describe('courses', () => {
    //get list of courses
it('it should GET all the courses', (done) => {
        chai.request(server)
            .get('/courses')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
    it('it should not GET all the courses', async () => {
        chai.request(server)
            .get('/courses')
            .then(function(res) {
              throw new Error('Some error occurred while retrieving.');
            })
            .catch(function(err) {
              expect(err).to.have.status(500);
            });
      });
  
  //delete course with id
it('it should  delete the courses with id', async () => {
      chai.request(server)
          .delete('/courses/:id')
          .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
          });
    });
    
    it('it should not delete the courses with id', async () => {
      chai.request(server)
          .delete('/courses/:id')
          .then(function(res) {
            throw new Error('id not matching');
          })
          .catch(function(err) {
            expect(err).to.have.status(204);
          });
    });
  
  //get course with id
  it('it should GET courses with id', async () => {
    chai.request(server)
        .get('/courses/:id')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
    });
  });
    it('it should not GET courses with id', async () => {
      chai.request(server)
          .get('/courses/:id')
          .then(function(res) {
            throw new Error('cannot find course with id');
          })
          .catch(function(err) {
            expect(err).to.have.status(500);
          });
        });
  
  //update course
  it('it should update courses', async () => {
    chai.request(server)
        .put('/courses/:id')
        .send({
          'code': 'A20',
          'name': 'string',
          'description': 'hello hi test'
      })
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
        });
      });
      it('it should not UPDATE course with id', async () => {
        chai.request(server)
            .put('/courses/:id')
            .then(function(res) {
              throw new Error('cannot find course with id to update');
            })
            .catch(function(err) {
              expect(err).to.have.status(204);
            });
      }); 

//create topic
it('it should create course', async () => {
  chai.request(server)
      .post('/courses')
      .send({
        'code':'A20',
        'name': 'Aptitude',
        'description': 'string'
    })
      .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('code');
            res.body.should.have.property('name');
            res.body.should.have.property('description');
            res.body.length.should.be.eql(3);
      });
    });

    it('it should not create topic', async () => {
      chai.request(server)
          .post('/topics')
          .send({
            'name': '',
            'description': 'string'
        })
        .then(function(res) {
          throw new Error('Some error occurred while creating topic.');
        })
        .catch(function(err) {
          expect(err).to.have.status(500);
        });
        });
  });

describe('coursemodules', () => {
    //get list of courses
      it('it should GET all the modules', (done) => {
        chai.request(server)
            .get('/modules')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(1);
              done();
            });
      });
      it('it should not GET all the modules', async () => {
        chai.request(server)
            .get('/modules')
            .then(function(res) {
              throw new Error('Some error occurred while retrieving.');
            })
            .catch(function(err) {
              expect(err).to.have.status(500);
            });
      });
  
  //delete course with id
    it('it should  delete the courses with id', async () => {
      chai.request(server)
          .delete('/modules/:id')
          .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
          });
    });
    
    it('it should not delete the modules with id', async () => {
      chai.request(server)
          .delete('/modules/:id')
          .then(function(res) {
            throw new Error('id not matching');
          })
          .catch(function(err) {
            expect(err).to.have.status(204);
          });
    });
  
  //get modules with id
  it('it should GET modules with id', async () => {
    chai.request(server)
        .get('/modules/:id')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
    });
  });
    it('it should not GET modules with id', async () => {
      chai.request(server)
          .get('/modules/:id')
          .then(function(res) {
            throw new Error('cannot find module with id');
          })
          .catch(function(err) {
            expect(err).to.have.status(500);
          });
        });
  
  //update modules
  it('it should update modules', async () => {
    chai.request(server)
        .put('/modules/:id')
        .send({
        'name': 'Time And Distance',
        'description': 'string'
        })
        .send({
          'code': 'A20',
          'name': 'string',
          'description': 'hello hi test'
      })
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
        });
      });
      it('it should not UPDATE module with id', async () => {
        chai.request(server)
            .put('/modules/:id')
            .then(function(res) {
              throw new Error('cannot find module with id to update');
            })
            .catch(function(err) {
              expect(err).to.have.status(204);
            });
      }); 

//create module
it('it should create module', async () => {
  chai.request(server)
      .post('/modules')
      .send({
        'name': 'Time And Distance',
        'description': 'string'
        })
      .send({
        'code':'A20',
        'name': 'Aptitude',
        'description': 'string'
    })
      .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('code');
            res.body.should.have.property('name');
            res.body.should.have.property('description');
            res.body.should.have.property('name');
            res.body.should.have.property('description');
            res.body.length.should.be.eql(6);
      });
    }); 
    it('it should not create module', async () => {
      chai.request(server)
          .post('/modules')
          .send({
            'name': '',
            'description': 'string'
            })
          .send({
            'code':'',
            'name': 'Aptitude',
            'description': 'string'
        })
            .then(function(res) {
              throw new Error('Some error occurred while creating topic.');
            })
            .catch(function(err) {
              expect(err).to.have.status(500);
            });
          });
  });

describe('questions', () => {
    //get list of questions
    it('it should GET all the questions', (done) => {
        chai.request(server)
            .get('/questions')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(2);
              done();
            });
      });
  it('it should not GET all the questions', (done) => {
        chai.request(server)
            .get('/questions')
            .then(function(res) {
              throw new Error('Some error occurred while retrieving.');
            })
            .catch(function(err) {
              expect(err).to.have.status(500);
            });
            done();
      });

  //create questions
    it('it should create questions', async () => {
      chai.request(server)
          .post('/questions')
          .send({
            'title': 'Cook Indomie',
            'description': 'hello hi test',
            'difficulty':8
        })
          .send({
            'description': 'hello hi test',
            'valid':true,
            'explanation':'hi this is explanation'
        })
          .end((err, res) => {
                res.should.have.status(422);
                res.should.be.json;
                res.body.should.be.a('object');
               });
        });
    it('it should not create questions as title is null', async () => {
      chai.request(server)
          .post('/questions')
          .send({
            'title': '',
            'description': 'hello hi test',
            'difficulty':8
        })
          .send({
            'description': 'hello hi test',
            'valid':true,
            'explanation':'hi this is explanation'
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.should.be.json;
        });
    });
    it('it should not create questions as description is null', async () => {
      chai.request(server)
          .post('/questions')
          .send({
            'title': 'title',
            'description': '',
            'difficulty':8
        })
          .send({
            'description': 'hello hi test',
            'valid':true,
            'explanation':'hi this is explanation'
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.should.be.json;
        });
    });
  
  //delete questions with id
    it('it should  delete the questions with id', async () => {
      chai.request(server)
          .delete('/question/:id')
          .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
          });
    });
    
    it('it should not delete the question with id', async () => {
      chai.request(server)
          .delete('/question/:id')
          .then(function(res) {
            throw new Error('id not matching');
          })
          .catch(function(err) {
            expect(err).to.have.status(204);
          });
    });
  
  //get question with id
    it('it should GET question with id', async () => {
      chai.request(server)
          .get('/questions/:id')
          .end((err, res) => {
            if(true)
            { res.should.have.status(404);}
            else{
                res.should.have.status(200);}
          });
    });
    it('it should not GET question with id', async () => {
      chai.request(server)
          .get('/questions/:id')
          .then(function(res) {
            throw new Error('Error retrieving question with id');
          })
          .catch(function(err) {
            expect(err).to.have.status(500);
          });
    }); 
  
  //update questions
  it('it should update questions', async () => {
    chai.request(server)
        .put('/questions/:id')
        .send({
          'title': 'title',
          'description': 'hello hi test',
          'difficulty':8
      })
        .send({
          'description': 'hello hi test',
          'valid':true,
          'explanation':'hi this is explanation'
      })
        .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.should.be.a('object');
        });
      });
      it('it should not update question with id', async () => {
        chai.request(server)
            .put('/questions/:id')
            .then(function(res) {
              throw new Error('cannot find context with id to update');
            })
            .catch(function(err) {
              expect(err).to.have.status(204);
            });
      }); 
    });
