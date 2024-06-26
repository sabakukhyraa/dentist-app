const supertest = require('supertest');
const app = require('../app.js')
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose')

let server;
beforeAll(async () => {
  await mongoose.connect(process.env.DB_URL, {
    dbName: "DentistApp",
  });
  server = app.listen(4000, () => {
    
  });

  await new Promise((resolve) => {
    server.once('listening', resolve);
  });
  global.agent = supertest.agent(server);
}, 15000);
afterAll(async () => {
  await mongoose.connection.close();
  server.close();
}, 15000);

const testPatientPayload = { //test patient to create or update
  "name": "TEST",
  "birthDate": "1980-01-11T09:00:00.000Z",
  "isAdult": true,
  "hasWisdomTeeth": false,
  "definedTeeth": [
    {
      "toothNumber": 14,
      "treatmentsBefore": ["Implant"],
      "description": "TEST'"
    },
    {
      "toothNumber": 15,
      "treatmentsBefore": ["Implant", "Whitening"],
      "description": "TEST"
    },
  ]
}

var createdPatientResponse;

const testId = new mongoose.Types.ObjectId().toString()
const patientToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFjNTY4NDk1ZDNiZDZmNDgwYTM4MDkiLCJpYXQiOjE3MTYxNDQ1MjYsImV4cCI6MTcxNjQwMzcyNn0.CSUG3Qqhou6RhFccK-DUvBGX3rdQxu5_UobGJdsJ9H4" //test user - patient
const doctorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ5MWQ2Yjg5ZjEyMzI0ODM0ODMxYmYiLCJpYXQiOjE3MTYxNDQ2MDIsImV4cCI6MTcxNjQwMzgwMn0.JQ7K3oGU69JpM1kDLJ0J-a8SmBPEV7cF6whEqmrcx4Y" //test user - doctor

describe('Patient Tests', () => {
  describe('GET a patient route test', () => {
    describe('Given the Patient Id doesn\'t exist', () => {
      test('Should return a 404', async () => {
        const patientId = "661cf075c889bb34da6c32b1";
        await global.agent.get(`/api/patients/one/${patientId}`).expect(404);
      }, 15000)
    })
    describe('Given the Patient Id does exist', () => {
      test('Should return a 200 status and the patient', async () => {
        const patientId = "661ce987bb64e62bb5c6c74f";
        const { body, statusCode } = await global.agent.get(`/api/patients/one/${patientId}`);

        expect(statusCode).toBe(200)
        expect(body._id).toBe(patientId)
      }, 15000)
    })
  })

  describe('CREATE patient route and Authorization test', () => {
    describe('Given the user is logged in and authorized.', () => {
      test('Should return a 200 status', async () => {
      
        createdPatientResponse = await global.agent
          .post('/api/patients')
          .set('Authorization', `Bearer ${doctorToken}`)
          .send(testPatientPayload)

        expect(createdPatientResponse.statusCode).toBe(201);
        expect(createdPatientResponse.body).toEqual({
          "__v": 1,
          "_id": expect.any(String),
          "birthDate": "1980-01-11T09:00:00.000Z",
          "createdAt": expect.any(String),
          "definedTeeth": [
            {
              "_id": expect.any(String),
              "description": "TEST'",
              "toothNumber": 14,
              "treatmentsBefore": [
                "Implant",
              ],
            },
            {
              "_id": expect.any(String),
              "description": "TEST",
              "toothNumber": 15,
              "treatmentsBefore": [
                "Implant",
                "Whitening",
              ],
            },
          ],
          "doctor": "66491d6b89f12324834831bc",
          "hasWisdomTeeth": false,
          "isAdult": true,
          "name": "TEST",
          "updatedAt": expect.any(String),
        })
      
      }, 15000)
    })
  })

  describe('DELETE patient route test', () => {
    describe('Given Patient Id is invalid.', () => {
      test('Should return a 500 status', async () => {
        await global.agent.delete('/api/patients/1').set('Authorization', `Bearer ${doctorToken}`).expect(400)
      }, 15000)
    })
    describe('Given Patient Id does not exist.', () => {
      test('Should return a 404 status', async () => {
        await global.agent.delete(`/api/patients/${testId}`).set('Authorization', `Bearer ${doctorToken}`).expect(404)
      }, 15000)
    })
    describe('Given Patient Id does exist and patient deleted.', () => {
      test('Should return a 200 status', async () => {
        await global.agent.delete(`/api/patients/${createdPatientResponse.body._id}`).set('Authorization', `Bearer ${doctorToken}`).expect(200)
      }, 15000)
      describe('Given the Patient Id of deleted patient doesn\'t exist', () => {
        test('Should return a 404 status', async () => {
          await global.agent.get(`/api/patients/${createdPatientResponse.body._id}`).set('Authorization', `Bearer ${doctorToken}`).expect(404)
        }, 15000)
      })
    })
  })
})