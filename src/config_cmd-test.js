/* global describe it afterEach */

import sinon from 'sinon'
import config from './config'
import configCmd from './config_cmd'

const sandbox = sinon.sandbox.create()

afterEach(() => sandbox.restore())

describe('configCmd', () => {
  it('should print all config variables', () => {
    sandbox.stub(console, 'log')
    configCmd()

    for (let key in config) {
      sinon.assert.calledWith(console.log, sinon.match(key))
      sinon.assert.calledWith(console.log, sinon.match(String(config[key])))
    }
  })
})
