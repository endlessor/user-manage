import React from 'react'
import { Button } from 'antd'

class ButtonContainer extends React.Component {
  render () {
    const { type, text, onClick } = this.props

    return (
      <div className={'button-container'}>
        <Button type={type} className={`${type}`} onClick={() => onClick('add')}>
          {text}
        </Button>
      </div>
    )
  }
}

export default ButtonContainer
