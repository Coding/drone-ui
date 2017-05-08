import Avatar from '../avatar';
import {branch} from 'baobab-react/higher-order';
import React from 'react';
import {browserHistory, Link} from 'react-router';
import {events, CLEAR_TOAST} from '../../actions/events';
import {Layout, Header, Drawer, Navigation, Content, IconButton, Menu, MenuItem, Snackbar} from 'react-mdl';

import './page.less';

class Page extends React.Component {
  handleTimeout() {
    events.emit(CLEAR_TOAST);
  }

  render() {
    const {pageHead, pageContent, pageToolbar, pageSidebar, user, state} = this.props;

    var pageMenu;
    if (user && user != null) {
      pageMenu = (
        <div className="site-user" id="drone-header-menu-right">
          <Avatar src={user.avatar_url} circle />
          <i name="more_vert" className="material-icons">keyboard_arrow_down</i>
          <Menu target="drone-header-menu-right" align="right">
            <MenuItem onClick={() => {browserHistory.push('/')}}>仪表盘</MenuItem>
            <MenuItem onClick={() => {browserHistory.push('/account')}}>用户设置</MenuItem>
            <MenuItem onClick={() => {window.location.href='/logout'}}>注销</MenuItem>
          </Menu>
        </div>
      );
    }

    return (
      <div style={{minHeight: '100vh', position: 'relative'}}>
          <Snackbar active={state.toast !== undefined} onTimeout={this.handleTimeout}>{state.toast}</Snackbar>
          <Layout fixedHeader fixedDrawer>
              <Header className="site-header">
                <div>{pageHead}</div>
                {pageMenu}
              </Header>
              <Drawer>
                <Navigation>
                  {pageSidebar}
                </Navigation>
              </Drawer>
              <Content>
                {pageToolbar}
                <div className="content">
                  {pageContent}
                </div>
              </Content>
          </Layout>
      </div>
    );
  }
}

export default branch({
  user: ['user'],
  state: ['pages']
}, Page);
