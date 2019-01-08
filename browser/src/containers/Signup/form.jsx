import React from 'react'
import { Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import Button from '../../components/Button/Button'

const namePattern = new RegExp(`^[a-zA-Z0-9]{4,20}$`)
const FormItem = Form.Item

class SignupForm extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      confirmDirty: false,
      visiblePassErrMessage: false,
    }
  }

  handleSubmit = (e) => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        delete values.confirm
        this.props.onSignup(values)
      }
    })
  }

   handleConfirmBlur = (e) => {
    this.setState({ confirmDirty: this.state.confirmDirty || !!e.target.value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      this.setState({ visiblePassErrMessage: true })
    } else {
      this.setState({ visiblePassErrMessage: false })
      callback()
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Form className={'signup-form'} >
        <h2 className={'form-title'}>Sign up</h2>
        <FormItem>
            {getFieldDecorator('name', {
            rules: [{
               required: true, message: 'Please input your name!', whitespace: true
              },
              {
                pattern: namePattern,
                message: 'Username should have length of range 4 ~ 20 and be alphaNumerical,'
              }]
            })(
            <Input placeholder={'Name'} spellCheck={false} />
            )}
        </FormItem>
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
            <Input placeholder={'Email'} spellCheck={false} />
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
            <Input type='password' placeholder={'Password'} />
            )}
        </FormItem>
        <FormItem>
            {getFieldDecorator('confirm', {
            rules: [{
                required: true, message: 'Please confirm your password!'
            }, {
                validator: this.compareToFirstPassword
            }]
            })(
            <Input type='password' placeholder={'Confirm Password'}
                onBlur={this.handleConfirmBlur} />
            )}
            {
            this.state.visiblePassErrMessage &&
                <p className={'error'}>Two passwords that you enter is inconsistent!</p>
            }
        </FormItem>
        <p className={'form-subscribe'}>
          If you have already an account of our site, please login <Link to={'/login'}>here</Link>
        </p>
        <div className={'btn-group'}>
          <Button type={'primary'} text={'Signup'} onClick={this.handleSubmit} />
        </div>
        <p className={'signup-back'}><Link to={'/'}>back</Link></p>
      </Form>
    )
  }
}
export default SignupForm
