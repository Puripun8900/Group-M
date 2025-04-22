const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
const should = chai.should();

const testUser = {
  username: `testuser_${Date.now()}`,
  email: `testuser_${Date.now()}@example.com`,
  password: 'testpass123'
};

const testSensor = {
  type: 'Temperature',
  model: 'DHT22',
  value: 25.5,
  unit: '°C'
};

let createdSensorId = "";

describe('Authentication Routes', () => {
  it('should signup a user', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(testUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message');
        done();
      });
  });

  it('should login the user', (done) => {
    chai.request(app)
      .post('/auth/login')
      .send({ username: testUser.username, password: testUser.password })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        done();
      });
  });
});

describe('Sensor CRUD + Latest + History Routes', () => {
  it('should add new sensor data', (done) => {
    chai.request(app)
      .post('/sensors')
      .send(testSensor)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('_id');
        createdSensorId = res.body._id;
        done();
      });
  });

  it('should fetch all sensor data', (done) => {
    chai.request(app)
      .get('/sensors')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('should fetch latest temperature', (done) => {
    chai.request(app)
      .get('/sensors/latest/temperature')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('temperature');
        done();
      });
  });

  it('should fetch latest humidity', (done) => {
    chai.request(app)
      .get('/sensors/latest/humidity')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('humidity');
        done();
      });
  });

  it('should fetch latest people count', (done) => {
    chai.request(app)
      .get('/sensors/latest/peoplecount')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('peopleCount');
        done();
      });
  });

  it('should fetch historical temperature data', (done) => {
    chai.request(app)
      .get('/sensors/history/temperature')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('should fetch historical humidity data', (done) => {
    chai.request(app)
      .get('/sensors/history/humidity')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('should fetch historical people count data', (done) => {
    chai.request(app)
      .get('/sensors/history/peoplecount')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
  });

  it('should update sensor data by id', (done) => {
    chai.request(app)
      .put(`/sensors/${createdSensorId}`)
      .send({ value: 30.0 })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('value').eql(30.0);
        done();
      });
  });

  it('should delete sensor data by id', (done) => {
    chai.request(app)
      .delete(`/sensors/${createdSensorId}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message');
        done();
      });
  });

  it('should fail to delete by date with missing params', (done) => {
    chai.request(app)
      .delete('/sensors?startDate=2025-01-01')
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message');
        done();
      });
  });

  it('should delete data by date range if exists', (done) => {
    chai.request(app)
      .delete('/sensors?startDate=2020-01-01&endDate=2030-01-01')
      .end((err, res) => {
        [200, 404].should.include(res.status);
        res.body.should.have.property('message');
        done();
      });
  });
});
