import React from 'react';
import { branch } from 'baobab-react/higher-order';
import CommonHeader from '../../components/header';

class Header extends React.Component {
  componentDidMount() {
    const {owner, name} = this.props.params;
    document.title = `${owner}/${name} | drone`;
  }

  render() {
    return (
      <CommonHeader />
    );
  }
}

export default branch({}, Header);
