import React from 'react'
import axios from 'axios';
import UserSignupForm from './form'
import { Form, Spin } from 'antd'
import { addNotificationHelper } from '../../constants/helper'
import NotificationSystem from 'react-notification-system'
import { mkLink } from '../../services/host'
import { withRouter } from 'react-router-dom'

class SignupPage extends React.Component {
  constructor () {
    super()
    this.state = {
        loading: false,
    };
  }

  onSignup = async (input) => {
    this.setState({ loading: true })
    try {
      await axios.post(mkLink('/users'), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        name: input.name,
        email: input.email,
        password: input.password,
      })
        .then((res) => {
          localStorage.setItem('authToken', res.data.token)
          this.setState({ loading: false })
          this.props.history.push({
            pathname: '/profile',
            state: { user: res.data.user, message: 'New user created successfully!' }
          })
        })
    } catch (err) {
      addNotificationHelper(this.refs.notificationSystem, err.response.data.error, 'error')
    }
    this.setState({ loading: false })
  }

  render () {
    const SignupForm = Form.create()(UserSignupForm)
    return (
      <div className={'plain-container'}>
        <div className={'userForm-content'}>
          <p className={`circle`}>
            <i className='fas fa-user' />
          </p>
          <p className={'close-icon'}>
            <i className='fas fa-times-circle hoverable' onClick={this.props.history.goBack} />
          </p>
          <div className={'confirm'}>
            <Spin spinning={this.state.loading} size='large' tip={'Please wait a few seconds'}>
              <SignupForm onSignup={this.onSignup} />
            </Spin>
          </div>
        </div>
        <NotificationSystem ref='notificationSystem' />
      </div>
    )
  }
}

export default withRouter(SignupPage)
