import React from 'react'
import axios from 'axios'
import PasswordLoginForm from './form'
import { Form, Spin } from 'antd'
import { addNotificationHelper } from '../../constants/helper'
import NotificationSystem from 'react-notification-system'
import { withRouter } from 'react-router-dom'
import { mkLink } from '../../services/host'

class LoginPage extends React.Component {
  constructor () {
    super()
    this.state = {
        loading: false,
    };
  }

  componentDidMount = () => {
    if (localStorage.getItem('authToken')) {
      this.props.history.push('/profile')
    }
  }

  onLogin = async (input) => {
    this.setState({ loading: true })
    try {
      await axios.post(mkLink('/users/login'), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        email: input.email,
        password: input.password,
      })
        .then((res) => {
          localStorage.setItem('authToken', res.data.token)
          this.setState({ loading: false })
          this.props.history.push({
            pathname: '/profile',
            state: { user: res.data.user, message: 'User is verified successfully!' }
          })
        })
    } catch (err) {
      addNotificationHelper(this.refs.notificationSystem, err.response.data.error, 'error')
    }
    this.setState({ loading: false })
  }

  render () {
    const LoginForm = Form.create()(PasswordLoginForm)
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
              <LoginForm onLogin={this.onLogin} />
            </Spin>
          </div>
        </div>
        <NotificationSystem ref='notificationSystem' />
      </div>
    )
  }
}

export default withRouter(LoginPage)
