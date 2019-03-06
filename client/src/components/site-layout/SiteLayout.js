import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import { getUser } from '../../actions/index';

import OverviewPage from '../overview-page/OverviewPage';
import AnalyticPage from '../analytic-page/AnalyticPage';
import CategoriesPage from '../categories-page/CategoriesPage';
import HistoryPage from '../history-page/HistoryPage';
import OrderPage from '../order-page/OrderPage';
import CategoriesForms from '../categories-page/categories-forms/CategoriesForms';
import OrderCategories from '../order-page/order-categories/OrderCategories';
import OrderPositions from '../order-page/order-positions/OrderPositions';
import ModalLinks from '../../templates/site-layout/ModalLinks';
import Links from '../../templates/site-layout/Links';


class SiteLayout extends Component {
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    localStorage.clear();
    const get = localStorage.getItem('auth-token');
    this.props.userLogin(get);
    return <Redirect to="/login" />;
  }

  render() {
    return (

      <Router>
        <div>
          <Links {...this.props} />

          <main className="content">
            <Switch>
              <Route exact path="/overview" component={OverviewPage} />
              <Route exact path="/history" component={HistoryPage} />
              <Route exact path="/analytics" component={AnalyticPage} />
            </Switch>
            <div>
              <Route path="/order" component={OrderPage} />
              <Route exact path="/order" component={OrderCategories} />
              <Route exact path="/order/:id" component={OrderPositions} />
            </div>
            <Switch>
              <Route exact path="/categories" component={CategoriesPage} />
              <Route exact path="/categories/new/" component={CategoriesForms} />
              <Route exact path="/categories/:id/" component={CategoriesForms} />
              <Redirect exact from="/login" to="/overview" key="for-over" />
              <Redirect exact from="/register" to="/overview" key="for-over" />
            </Switch>
          </main>
          <ModalLinks />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  links: state.links,
  token: state.token,
});
const mapDispatchToProps = dispath => ({
  userLogin: token => dispath(getUser(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SiteLayout);
