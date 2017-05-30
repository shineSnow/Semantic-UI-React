import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { isValidElement } from 'react'

import {
  customPropTypes,
  getElementType,
  getUnhandledProps,
  makeDebugger,
  META,
  SUI,
} from '../../lib'
import { getChildMapping, mergeChildMappings } from '../../lib/ChildMapping'
import Transition from './Transition'

const debug = makeDebugger('Transition:Group')

export default class TransitionGroup extends React.Component {
  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** Named animation event to used. Must be defined in CSS. */
    animation: PropTypes.oneOf(SUI.TRANSITIONS),

    /** Primary content. */
    children: PropTypes.node,

    /** Duration of the CSS transition animation in microseconds. */
    duration: PropTypes.number,
  }

  static defaultProps = {
    animation: 'fade',
    duration: 500,
  }

  static _meta = {
    name: 'Transition',
    type: META.TYPES.MODULE,
  }

  constructor(...args) {
    super(...args)

    const { children, duration } = this.props
    this.state = { children: getChildMapping(children, child => (
      <Transition
        children={child}
        duration={duration}
        into
        onHide={this.handleOnHide}
        reactKey={child.key}
      />
    )) }
  }

  componentWillReceiveProps(nextProps) {
    debug('componentWillReceiveProps()')

    const { children: prevMapping } = this.state
    const nextMapping = getChildMapping(nextProps.children)
    const children = mergeChildMappings(prevMapping, nextMapping)

    _.forEach(children, (child, key) => {
      if (!isValidElement(child)) return

      const duration = this.props.duration

      const hasPrev = key in prevMapping
      const hasNext = key in nextMapping

      const prevChild = prevMapping[key]
      const isLeaving = isValidElement(prevChild) && !prevChild.props.into

      // item is new (entering)
      if (hasNext && (!hasPrev || isLeaving)) {
        children[key] = (
          <Transition
            into
            children={child}
            duration={duration}
            key={key}
            reactKey={key}
            transitionAppear
          />
        )
      }
      // item is old (exiting)
      else if (!hasNext && hasPrev && !isLeaving) {
        children[key] = (
          <Transition
            into={false}
            children={child}
            duration={duration}
            key={key}
            reactKey={key}
          />
        )
      }
      // item hasn't changed transition states
      // copy over the last transition props;
      else if (hasNext && hasPrev && isValidElement(prevChild)) {
        children[key] = (
          <Transition
            into={ prevChild.props.into}
            children={child}
            duration={duration}
            onHide={this.handleOnHide}
            reactKey={key}
            transitionAppear={prevChild.props.transitionAppear}
          />
        )
      }
    })

    this.setState({ children })
  }

  handleOnHide = (e, props) => {
    debug('handleOnHide', props)

    const { children } = this.props
    const { reactKey } = props
    const currentMapping = getChildMapping(children)

    if (!_.has(currentMapping, reactKey)) return

    this.setState(state => {
      const children = { ...state.children }
      delete children[reactKey]

      return { children }
    })
  };

  render() {
    debug('render')
    debug('props', this.props)
    debug('state', this.state)

    const { children } = this.state
    const ElementType = getElementType(TransitionGroup, this.props)
    const rest = getUnhandledProps(TransitionGroup, this.props)

    return <ElementType {...rest}>{_.values(children)}</ElementType>
  }
}
