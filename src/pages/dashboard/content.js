import {branch} from 'baobab-react/higher-order';
import PageContent from '../../components/layout/content';
import React from 'react';

import './index.less';

class Content extends React.Component {

  render() {
    let {user} = this.props;

    if (!user || !user.login) {
      return (
        <PageContent fluid className="dashboard">
          <div className="alert">请 <a href="/login">登录</a> 以获取更多功能。</div>
        </PageContent>
      );
    }

    return (
      <PageContent fluid className="dashboard">
        <div className="alert">请选择一个项目。</div>
      </PageContent>
    );
  }
}

export default branch({
  user: ['user']
}, Content);
