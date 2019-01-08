import React from 'react'
import { Route, Switch } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { PrivateRoute } from './privateRouter'
import Home from '../containers/Home'
import Login from '../containers/Login'
import SignUp from '../containers/Signup'
import Profile from '../containers/Profile'

class RouteComponent extends React.Component<Props> {
    render () {
      return (
        <BrowserRouter>
            <Switch>
                <Route exact path={'/'} component={Home} />
                <Route path={'/login'} component={Login} />
                <Route path={'/signup'} component={SignUp} />
                <PrivateRoute path={'/profile'} component={Profile} />
            </Switch>
        </BrowserRouter>
      )
    }
  }

  export default RouteComponent