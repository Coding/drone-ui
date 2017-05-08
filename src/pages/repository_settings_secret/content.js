import { branch } from 'baobab-react/higher-order';
import PageContent from '../../components/layout/content';
import React from 'react';
import { events, GET_REPO_SECRETS, DEL_REPO_SECRET, POST_REPO_SECRET } from '../../actions/events';
import { Textfield, FABButton, Icon, Switch, Grid, Cell, Checkbox } from 'react-mdl';

import './index.less';

const eventTypes = [
  { label: '推送权限', value: 'push' },
  { label: '标签权限', value: 'tag' },
  { label: '部署权限', value: 'deployment' },
  { label: 'Pull Request 权限', value: 'pull_request' }
];

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addSecret: this.defaultEvent()
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdateSecret = this.handleUpdateSecret.bind(this);
  }

  defaultEvent() {
    return {
      name: '',
      value: '',
      event: ['push', 'tag', 'deployment'],
      skip_verify: false,
      conceal: false
    };
  }

  componentDidMount() {
    const { owner, name } = this.props.params;
    events.emit(GET_REPO_SECRETS, { owner, name });
  }

  render() {
    const { owner, name } = this.props.params;
    const { secrets } = this.props;
    if (!secrets) {
      return (
        <div>加载中...</div>
      );
    }

    return (
      <PageContent className="repository-secrets">
        <h5>密钥列表</h5>
        {
          secrets
            .map((secret, index) => {
              return (

                <div key={index}>
                  <Textfield
                    label="名称"
                    floatingLabel
                    style={{ width: '300px' }}
                    value={secret.name}
                    disabled={true}
                  />
                  <Textfield
                    label="更新值"
                    floatingLabel
                    style={{ width: '300px' }}
                    value={this.state[secret.name]}
                    onChange={(field) => this.handleSecretChange(secret.name, field.target.value)}
                  />
                  <FABButton ripple mini accent
                             onClick={this.handleDelete.bind(this, owner, name, secret.name)}
                  >
                    <Icon name="delete"/>
                  </FABButton>
                  <FABButton ripple mini primary
                             disabled={!this.state[secret.name]}
                             onClick={this.handleUpdateSecret.bind(this, owner, name, secret.name)}
                  >
                    <Icon name="update"/>
                  </FABButton>
                  <div style={{ width: '100%', margin: 'auto' }}>
                    <Grid className="secret-properties">
                      <Cell col={6}>
                        {
                          eventTypes.map(eventType => {
                            return (
                              <Switch key={eventType.value} id={eventType.value} disabled={true} checked={ secret.event.indexOf(eventType.value) !== -1}>{eventType.label}</Switch>
                            );
                          })
                        }
                      </Cell>
                      <Cell col={6}>
                        <Checkbox label="跳过验证" disabled={true} checked={ secret.skip_verify }/>
                        <Checkbox label="隐藏" disabled={true} checked={ secret.conceal}/>
                      </Cell>
                    </Grid>
                  </div>
                </div>
              );
            })
        }
        <hr/>
        <h5>添加新的密钥</h5>
        <Textfield
          label="名称"
          floatingLabel
          style={{ width: '300px' }}
          onChange={(field) => this.handleAddKeyChange(field.target.value)}
          value={this.state.addSecret.name}
        />
        <Textfield
          label="值"
          floatingLabel
          style={{ width: '300px' }}
          onChange={(field) => this.handleAddSecretChange(field.target.value)}
          value={this.state.addSecret.value}
        />
        <FABButton ripple mini primary
                   onClick={this.handleAdd.bind(this, owner, name)}
                   disabled={ this.state.addSecret.name === '' || this.state.addSecret.value === ''}
        >
          <Icon name="add"/>
        </FABButton>
        <div style={{ width: '100%', margin: 'auto' }}>
          <Grid className="secret-properties">
            <Cell col={6}>
              {
                eventTypes.map(eventType => {
                  return (
                    <Switch key={eventType.value} id={eventType.value} onChange={ (field) => this.handleAddEventSwitch(field) }
                            checked={ this.state.addSecret.event.indexOf(eventType.value) !== -1}>{eventType.label}</Switch>
                  );
                })
              }
            </Cell>
            <Cell col={6}>
              <Checkbox id="skip_verify" label="跳过验证" onChange={(field) => this.handleOptionalChange(field)}
                        checked={ this.state.addSecret.skip_verify }/>
              <Checkbox id="conceal" label="隐藏" onChange={(field) => this.handleOptionalChange(field)}
                        checked={ this.state.addSecret.conceal }/>
            </Cell>
          </Grid>
        </div>

      </PageContent>
    );
  }

  handleDelete(owner, name, secret) {
    events.emit(DEL_REPO_SECRET, { owner, name, secret });
  }

  handleUpdateSecret(owner, name, secretKey) {
    //TODO: need to handle skip_verify and what events
    let secret = {
      name: secretKey,
      value: this.state[secretKey],
      event: ['push', 'tag', 'deployment'],
      skip_verify: false
    };
    events.emit(POST_REPO_SECRET, { owner, name, secret });
  }

  handleAdd(owner, name) {
    events.emit(POST_REPO_SECRET, { owner, name, secret: this.state.addSecret });
    this.setState({ addSecret: this.defaultEvent() });
  }

  handleAddEventSwitch(item) {
    let tempSecret = this.state.addSecret;
    if (!item.target.checked) {
      tempSecret.event = tempSecret.event.filter(o => o !== item.target.id);
    } else {
      tempSecret.event.push(item.target.id);
    }
    this.setState({ addSecret: tempSecret });
  }

  handleOptionalChange(item) {
    let tempSecret = this.state.addSecret;
    tempSecret[item.target.id] = item.target.checked;
    this.setState(tempSecret);
  }


  handleAddKeyChange(addKey) {
    let tempSecret = this.state.addSecret;
    tempSecret.name = addKey;
    this.setState({ addSecret: tempSecret });
  }

  handleAddSecretChange(addValue) {
    let tempSecret = this.state.addSecret;
    tempSecret.value = addValue;
    this.setState({ addSecret: tempSecret });
  }

  handleSecretChange(secret_name, value) {
    this.setState({ [secret_name]: value });
  }
}

export default branch((props) => {
  const { owner, name } = props.params;
  return {
    secrets: ['secrets', owner, name]
  };
}, Content);
