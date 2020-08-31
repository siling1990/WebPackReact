import React from 'react';
import PropTypes from 'prop-types';
import {
  routerRedux,
  Route,
  Switch,
} from 'dva/router';
import Home from './home';
import Login from './login';
import SetData from './setData';
import './index.less';

const {ConnectedRouter} = routerRedux;

export default function Router({history}) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path='/login' component={Login}/>
        <Route path="/home" component={Home} />
        <Route path="/setData" component={SetData} />
      </Switch>
    </ConnectedRouter>
  );
}

Router.propTypes = {
  history: PropTypes.object
};
