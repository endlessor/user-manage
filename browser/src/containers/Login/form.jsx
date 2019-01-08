import React from 'react'
import { Form, Icon, Input } from 'antd'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'

const FormItem = Form.Item

class PasswordLoginForm extends React.Component<Props, State> {
  onLogin = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        delete values.confirm
        this.props.onLogin(values)
      }
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className={'login-form'}>
        <h2 className={'form-title'}>Login</h2>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!'
            },
            {
              required: true, message: 'Please input your E-mail!'
            },
            {
              max: 50, message: 'The email length should be less than 50'
            }]
          })(
            <Input prefix={<Icon type={'user'} className={'login-prefix'} />}
              placeholder={'Email'} />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!'
            },
            {
              min: 8, message: 'password length should be more than 8'
            },
            {
              max: 20, message: 'password length should be less than 20'
            },
            {
                validator: this.validateToNextPassword
            }]
          })(
            <Input prefix={<Icon type={'lock'} className={'login-prefix'} />}
              type={'password'} placeholder={'Password'} />
          )}
        </FormItem>
        <p className={'form-subscribe'}>If you don't have an account of our site, please signup <Link to={'/signup'}>here</Link>
          </p>
        <div className={'btn-group'}>
          <Button type={'primary'} text={'Login'} onClick={this.onLogin} />
        </div>
        <p className={'login-back'}><Link to={'/'}>back</Link></p>
      </Form>
    )
  }
}

export default PasswordLoginForm
