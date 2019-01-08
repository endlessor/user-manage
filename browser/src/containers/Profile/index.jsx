import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Table } from 'antd'
import { withRouter } from 'react-router-dom'
import { addNotificationHelper } from '../../constants/helper'
import NotificationSystem from 'react-notification-system'
import { mkLink } from '../../services/host'

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Email',
  dataIndex: 'email',
  key: 'email',
}];

class Profile extends React.Component {
  constructor () {
    super()
    this.state = {
        user: {},
        message: '',
    }
  }

  componentDidMount = async () => {
    if (this.props.location.state) {
      if (this.props.location.state.user.name) {
        this.setState({ user: this.props.location.state.user })
      }
      if (this.props.location.state.message) {
        addNotificationHelper(this.refs.notificationSystem, this.props.location.state.message, 'success')
      }
    } else {
      try {
        await axios.get(mkLink('/users'), {
          headers: {
            Authorization: localStorage.getItem('authToken')
          }
        })
          .then((res) => {
            this.setState({ user: res.data.user })
          })
      } catch (err) {
        addNotificationHelper(this.refs.notificationSystem, err.response.data.error, 'error')
      }
    }
  }

  logout =() => {
    localStorage.setItem('authToken', '')
    this.props.history.push('/login')
  }

  mkTableData = (user) => {
    let tblData = []
    tblData.push({
      key: '1',
      name: user.name,
      email: user.email
    })
    return tblData
  }

  render () {
    const dataSource = this.mkTableData(this.state.user)
    return (
      <div className={'profile-container'}>
        <h2 className={'profile-title'}>Welcome {this.state.user.name}</h2>
        <br />
        <div className={'user-data'}>
          <p className={'profile-label'}>user information:</p>
          <Table dataSource={dataSource} columns={columns} />
        </div>
        <br />
        <p>
          <Link to={'/'}><Button type='primary' size={'large'} >Back</Button></Link>&nbsp;
          <Button type='default' size={'large'} onClick={this.logout}>Logout</Button>
        </p>
        <NotificationSystem ref='notificationSystem' />
      </div>
    )
  }
}

export default withRouter(Profile)
