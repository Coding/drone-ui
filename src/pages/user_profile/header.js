import React from 'react';
import { branch } from 'baobab-react/higher-order';
import CommonHeader from '../../components/header';

class Header extends React.Component {
  componentDidMount() {
    const {owner, name} = this.props.params;
    document.title = `项目列表 | Drone`;
  }

  render() {
    return (
      <CommonHeader />
    );
  }
}

export default branch({}, Header);
