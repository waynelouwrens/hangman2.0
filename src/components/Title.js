import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Title extends PureComponent {
  static propTypes = { // eslint-disable-line no-undef
  content: PropTypes.string.isRequired,
}
  render() {
    return(
      <h1> { this.props.content }</h1>
    )
  }
}

export default Title
