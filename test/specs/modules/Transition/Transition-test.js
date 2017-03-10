import React from 'react'

import Transition from 'src/modules/Transition/Transition'
import * as common from 'test/specs/commonTests'

let wrapper

const wrapperShallow = (...args) => (wrapper = shallow(...args))

describe('Transition', () => {
  common.hasValidTypings(Transition)

  beforeEach(() => {
    wrapper = undefined
  })

  afterEach(() => {
    if (wrapper) {
      if (wrapper.unmount) wrapper.unmount()
      if (wrapper.detach) wrapper.detach()
    }
  })

  describe('animation', () => {

  })

  describe('className', () => {
    it("passes element's className", () => {
      wrapperShallow(
        <Transition>
          <p className='foo bar' />
        </Transition>
      )

      wrapper.should.have.className('foo')
      wrapper.should.have.className('bar')
    })
  })

  describe('duration', () => {
    it('applies default value to style', () => {
      wrapperShallow(
        <Transition>
          <p />
        </Transition>
      ).should.have.style('animation-duration', '500ms')
    })

    it('applies value to style', () => {
      wrapperShallow(
        <Transition duration={1000}>
          <p />
        </Transition>
      ).should.have.style('animation-duration', '1000ms')
    })
  })

  describe('into', () => {

  })

  describe('mountOnEnter', () => {

  })

  describe('onComplete', () => {

  })

  describe('onHide', () => {

  })

  describe('onShow', () => {

  })

  describe('onStart', () => {

  })

  describe('style', () => {
    it("passes element's style", () => {
      wrapperShallow(
        <Transition>
          <p style={{ bottom: 5, top: 10 }} />
        </Transition>
      )

      wrapper.should.have.style('bottom', '5px')
      wrapper.should.have.style('top', '10px')
    })
  })

  describe('transitionAppear', () => {

  })

  describe('unmountOnExit', () => {

  })
})
