import { fetchRandomAlanQuote, REQUEST_RANDOM_ALAN_QUOTE, RECEIVED_RANDOM_ALAN_QUOTE } from '../../src/actions';
import { expect } from 'chai';
import sinon from 'sinon';

describe('fetchRandomAlanQuote', () => {
  it('should return a function', () => {
    expect(fetchRandomAlanQuote()).to.be.a('function');
  });

  it('should dispatch requestRandomAlanQuote and receivedRandomAlanQuote', () => {
    const jsonValue = JSON.stringify("hello");
    const jsonStub = sinon.stub().returns(jsonValue)
    const response = { json: jsonStub };
    const fetchStub = sinon.stub().resolves(response);
    global.fetch = fetchStub;
    const dispatchStub = sinon.stub();
    const thunk = fetchRandomAlanQuote();
    const action = thunk(dispatchStub);

    const requestRandomAlanQuoteAction = { type: REQUEST_RANDOM_ALAN_QUOTE };
    const receivedRandomAlanQuoteAction =
    {
      type: RECEIVED_RANDOM_ALAN_QUOTE,
      randomAlanQuote: JSON.parse(jsonValue),
    };

    expect(dispatchStub.calledWith(requestRandomAlanQuoteAction)).to.equal(true);

    action.then(() => {
      expect(dispatchStub.calledTwice).to.equal(true);
      expect(dispatchStub.calledWith(receivedRandomAlanQuoteAction)).to.equal(true);
    }).catch(er => expect(er).to.equal(false))
  });
});
