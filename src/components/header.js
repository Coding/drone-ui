import React from 'react';
import { Link } from 'react-router';

import './header.less';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <img className="site-logo" src="/static/coding-logo.png" />
        </Link>
        <ul className="site-nav">
          <li>
            <a href="https://coding.net/" target="_blank">平台版</a>
          </li>
          <li>
            <a href="https://e.coding.net/" target="_blank">企业版</a>
          </li>
          <li>
            <a href="https://ide.coding.net/" target="_blank">IDE</a>
          </li>
          <li>
            <a href="https://coding.net/pp" target="_blank">冒泡</a>
          </li>
          <li>
            <Link>Gist</Link>
          </li>
        </ul>
      </div>
    );
  }
}
