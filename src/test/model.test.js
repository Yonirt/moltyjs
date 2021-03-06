const { expect } = require('chai');

const Document = require('../document');
const Molty = require('../index');
const { Schema, connect, Model } = Molty;

const Middleware = require('../middleware');

const { testSchema, testSchema2, testOptions, s, conn } = require('./mock');

describe('# Model', () => {
  let newDoc;
  const email = 'mariolemes4@gmail.com';
  const firstName = 'Mario';
  const lastName = 'Lemes';
  const gender = 'Male';

  before(async () => {
    const m = new Model(s, 'TestModel');

    newDoc = await m.new({
      test: ['OOOKK', 'YEEEES'],
      email,
      firstName,
      lastName,
      password: '1321321',
      birthdate: Date.now(),
      gender,
      emergencyContactInfo: {
        location: 'Las Palmas',
        relation: 'Brother',
      },
    });

    const Test2 = new Model(testSchema2, 'Schema2');
  });

  it('Creating a new document from Model with schema (s)', () => {
    expect(newDoc).to.be.an.instanceof(Document);
    expect(newDoc).to.have.property('_data');
    expect(newDoc._data).to.have.property('email', email);
    expect(newDoc._data).to.have.property('firstName', firstName);
    expect(newDoc._data).to.have.property('lastName', lastName);
    expect(newDoc._data).to.have.property('gender', gender);
    expect(newDoc._data).to.have.property('_id');
  });

  it('Saving the new doc into the DB', async () => {
    try {
      const res = await conn.insertOne('test2', newDoc);
      expect(res).to.have.property('_data');
      expect(res._data._id).to.equal(newDoc._data._id);
      expect(res._data).to.deep.equal(newDoc._data);
    } catch (error) {
      throw error;
    }
  });
});
