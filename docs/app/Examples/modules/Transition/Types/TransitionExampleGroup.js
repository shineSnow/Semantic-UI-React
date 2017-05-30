import faker from 'faker'
import _ from 'lodash'
import React, { Component } from 'react'
import { Button, Image, List, Transition } from 'semantic-ui-react'

const makeItem = () => ({
  avatar: faker.image.avatar(),
  name: faker.name.firstName(),
})

export default class TransitionExampleGroup extends Component {
  state = { items: _.times(5, makeItem) }

  handleAdd = () => {
    const { items } = this.state
    this.setState({ items: [...items, makeItem()] })
  }

  handleRemove = () => {
    const { items } = this.state
    this.setState({ items: items.slice(0, -1) })
  }

  render() {
    const { items } = this.state

    return (
      <div>
        <Transition.Group
          as={List}
          animation='scale'
          duration={1500}
          divided
          size='huge'
          verticalAlign='middle'
        >
          {items.map(({ avatar, name }) => (
            <List.Item key={name}>
              <Image avatar src={avatar} />
              <List.Content header={name} />
            </List.Item>
          ))}
        </Transition.Group>

        <Button.Group>
          <Button icon='minus' onClick={this.handleRemove} />
          <Button icon='plus' onClick={this.handleAdd} />
        </Button.Group>
      </div>
    )
  }
}
