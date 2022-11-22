const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { passengerService } = require('../../../src/services');
const passengerController = require('../../../src/controllers/passenger.controller');
const {
  happyControllerResponseCreateTravelObject,
  happyReqCreateTravelObject,
  happyResponseCreateTravelObject,
  passengerMock,
  newPassengerMock,
} = require('./mocks/passenger.controller.mock');

describe('Teste de unidade do passengerController', function () {
  it('Criando uma nova viagem', async function () {
    const res = {};
    const req = happyReqCreateTravelObject;

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(passengerService, 'requestTravel')
      .resolves(happyControllerResponseCreateTravelObject);

    await passengerController.createTravel(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(happyResponseCreateTravelObject);
  });

  it('Listando as pessoas passageiras', async function () {
    const res = {};
    const req = {};
    const passengerList = [newPassengerMock];

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(passengerService, 'findAll')
      .resolves({ type: null, message: passengerList });

    await passengerController.listPassengers(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(passengerList);
  });

  it('Buscando uma pessoa passageira', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(passengerService, 'findById')
      .resolves({ type: null, message: newPassengerMock });

    await passengerController.getPassenger(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(newPassengerMock);
  });

  it('Cadastrando uma nova pessoa passageira com sucesso', async function () {
    const res = {};
    const req = {
      body: passengerMock,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(passengerService, 'createPassenger')
      .resolves({ type: null, message: newPassengerMock });

    await passengerController.createPassenger(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newPassengerMock);
  });

  afterEach(sinon.restore);
});
