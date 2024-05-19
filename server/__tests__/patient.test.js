const supertest = require('supertest');
const app = require('../app.js')
describe('Patient', () => {
  describe('Get patient route', () => {

    describe('Given the Patient Id doesn\'t exist', () => {
      it('Should return a 404', async () => {
        const patientId = "123vm142bnm213";
        await supertest(app).get(`/api/patients/${patientId}`).expect(404);
      })
    })

    describe('Given the Patient Id does exist', () => {
      it('Should return a 200 status and the patient', async () => {
        const patientId = "661c567295d3bd6f480a37eb";
        const { body, statusCode } = await supertest(app).get(`/api/patients/${patientId}`);

        expect(statusCode).toBe(200)

        expect(body._id).toBe(patientId)

      })
    })

  })
});