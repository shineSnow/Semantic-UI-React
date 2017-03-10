import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { cloneElement, isValidElement } from 'react'

import { getUnhandledProps, META } from '../../lib'
import { getChildMapping, mergeChildMappings } from '../../lib/ChildMapping'

export default class TransitionGroup extends React.Component {
  static propTypes = {
    component: PropTypes.any,
    children: PropTypes.node,
    duration: PropTypes.any,
  }

  static defaultProps = {
    component: 'div',
  }

  static _meta = {
    name: 'Transition',
    type: META.TYPES.MODULE,
  }

  constructor(props, context) {
    super(props, context)

    const { children, duration } = props
    const mapping = getChildMapping(children, child => {
      return cloneElement(child, {
        duration,
        into: true,
        onExited: () => this.handleExited(child.key),
      })
    })

    this.state = { children: mapping }
  }

  componentWillReceiveProps(nextProps) {
    let prevChildMapping = this.state.children
    let nextChildMapping = getChildMapping(nextProps.children)

    let children = mergeChildMappings(prevChildMapping, nextChildMapping)

    Object.keys(children).forEach((key) => {
      let child = children[key]

      if (!isValidElement(child)) return

      const onExited = () => this.handleExited(key)
      const duration = this.props.duration

      const hasPrev = key in prevChildMapping
      const hasNext = key in nextChildMapping

      const prevChild = prevChildMapping[key]
      const isLeaving = isValidElement(prevChild) && !prevChild.props.into

      // item is new (entering)
      if (hasNext && (!hasPrev || isLeaving)) {
        // console.log('entering', key)
        children[key] = cloneElement(child, {
          onExited,
          into: true,
          transitionAppear: true,
          duration,
        })
      }
      // item is old (exiting)
      else if (!hasNext && hasPrev && !isLeaving) {
        // console.log('leaving', key)
        children[key] = cloneElement(child, { into: false, duration })
      }
      // item hasn't changed transition states
      // copy over the last transition props;
      else if (hasNext && hasPrev && isValidElement(prevChild)) {
        // console.log('unchanged', key)
        children[key] = cloneElement(child, {
          onExited,
          into: prevChild.props.into,
          transitionAppear: prevChild.props.transitionAppear,
        })
      }
    })

    this.setState({ children })
  }

  handleExited = key => {
    const currentChildMapping = getChildMapping(this.props.children)
    if (key in currentChildMapping) return

    this.setState(state => {
      const children = { ...state.children }
      delete children[key]

      return { children }
    })
  };

  render() {
    const { component: Component } = this.props
    const { children } = this.state
    const rest = getUnhandledProps(TransitionGroup, this.props)

    return <Component {...rest}>{_.values(children)}</Component>
  }
}
