import {branch} from 'baobab-react/higher-order';
import {Link} from 'react-router';
import React from 'react';
import {Tabs, Tab}from '../../components/layout/tabs';

class Toolbar extends React.Component {
  render() {
    const {user} = this.props;
    const { owner, name } = this.props.params;

    const tabs = [
      {url: `/${owner}/${name}`, re: new RegExp(`/${owner}/${name}(/\\d+)*$`), text: '构建'},
      {url: `/${owner}/${name}/settings/badges`, re: new RegExp(`/${owner}/${name}/settings/badges$`), text: '徽章'}
    ];

    if (user) {
      tabs.push({url: `/${owner}/${name}/settings/`, re: new RegExp(`/${owner}/${name}/settings/$`), text: '设置'});
      tabs.push({url: `/${owner}/${name}/settings/secret/`, re: new RegExp(`/${owner}/${name}/settings/secret/$`), text: '密钥'});
    }

    return (
      <Tabs>
        {tabs.map((tab, index) => {
          return (
            <Tab key={index}>
              <Link to={tab.url} className={tab.re.test(this.props.location.pathname) ? 'active' : ''}>{tab.text}</Link>
            </Tab>
          );
        })}
      </Tabs>
    );
  }
}


export default branch({
  user: ['user']
}, Toolbar);
