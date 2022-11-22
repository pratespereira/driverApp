const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const validateNewPassengerFields = require('../../../src/middlewares/validateNewPassengerFields');

const validName = 'Doriana Quintal';
const validEmail = 'doriana.quintal@acme.com';
const validPhone = '(49) 3882-3117';

const errorMessage = { message: 'fields not passed' };

describe('Teste de unidade do middleware validateNewPassengerFields', function () {
  it('Tentando cadastrar uma nova pessoa passageira sem nome retorna erro', async function () {
    const res = {};
    const req = {
      body: {
        email: validEmail,
        phone: validPhone,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateNewPassengerFields(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(errorMessage);
  });

  it('Tentando cadastrar uma nova pessoa passageira sem email retorna erro', async function () {
    const res = {};
    const req = {
      body: {
        name: validName,
        phone: validPhone,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateNewPassengerFields(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(errorMessage);
  });

  it('Tentando cadastrar uma nova pessoa passageira sem telefone retorna erro', async function () {
    const res = {};
    const req = {
      body: {
        name: validName,
        email: validEmail,
      },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    await validateNewPassengerFields(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(errorMessage);
  });

  it('Passando os dados corretamente chama o próximo middleware', async function () {
    const res = {};
    const req = {
      body: {
        name: validName,
        email: validEmail,
        phone: validPhone,
      },
    };

    const next = sinon.stub().returns();

    await validateNewPassengerFields(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  afterEach(sinon.restore);
});
