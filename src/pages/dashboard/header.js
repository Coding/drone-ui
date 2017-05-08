import React from 'react';
import { Link } from 'react-router';
import { branch } from 'baobab-react/higher-order';
import CommonHeader from '../../components/header';

class Header extends React.Component {
  componentDidMount() {
    document.title = '欢迎 | Drone';
  }
  render() {
    return (
      <CommonHeader />
    );
  }
}

export default branch({}, Header);
