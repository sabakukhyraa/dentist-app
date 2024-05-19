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

const testId = new mongoose.Types.ObjectId().toString()
const patientToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjFjNTY4NDk1ZDNiZDZmNDgwYTM4MDkiLCJpYXQiOjE3MTYxNDQ1MjYsImV4cCI6MTcxNjQwMzcyNn0.CSUG3Qqhou6RhFccK-DUvBGX3rdQxu5_UobGJdsJ9H4" //test user - patient
const doctorToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQ5MWQ2Yjg5ZjEyMzI0ODM0ODMxYmYiLCJpYXQiOjE3MTYxNDQ2MDIsImV4cCI6MTcxNjQwMzgwMn0.JQ7K3oGU69JpM1kDLJ0J-a8SmBPEV7cF6whEqmrcx4Y" //test user - doctor

describe('Doctor Tests', () => {
  describe('GET doctor name', () => {
    test('Should return a doctor name', async () => {
      // /api/doctors
      const { body, statusCode } = await global.agent
        .get("/api/doctors")
        .set("Authorization", `Bearer ${doctorToken}`);
      
      expect(statusCode).toBe(200);
      expect(body.name).toEqual(expect.any(String));
      
    })
  })
  
  describe('COUNT the patients of a doctor', () => {
    test('Should return a 201 status code and a Number', async () => {
      const { body, statusCode } = await global.agent
        .get('/api/patients/count')
        .set('Authorization', `Bearer ${doctorToken}`)
      
      expect(statusCode).toBe(200)
      expect(body).toEqual(expect.any(Number))
    })
  })
})