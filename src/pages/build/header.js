import React from 'react';
import { Link } from 'react-router';
import { branch } from 'baobab-react/higher-order';
import CommonHeader from '../../components/header';

class Header extends React.Component {
  componentDidMount() {
    const { owner, name, number } = this.props.params;
    document.title = `构建 #${number} (${owner}/${name}) | Drone`;
  }
  render() {
    return (
      <CommonHeader />
    );
  }
}

export default branch({}, Header);
