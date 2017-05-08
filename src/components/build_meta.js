import React from 'react';
import TimeAgo from 'react-timeago';
import zhStrings from 'react-timeago/lib/language-strings/zh-CN'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import './build_meta.less';

export default
class BuildMeta extends React.Component {
  render() {
    const { build } = this.props;
    const formatter = buildFormatter(zhStrings);

    var eventDesc;
    var eventDest;

    switch(build.event) {
    case 'push':
      eventDesc = '推送到';
      eventDest = build.branch;
      break;
    case 'pull_request':
      eventDesc = '更新了 Pull Request';
      eventDest = (build.refspec != '') ?
            build.refspec : build.branch;
      break;
    case 'tag':
      eventDesc = '推送了标签';
      eventDest = build.ref;
      break;
    case 'deployment':
      eventDesc = '部署至';
      eventDest = build.deploy_to;
      break;
    }

    return (
      <p className="build-meta">
        <em>{build.author}</em>
        <span>{eventDesc}</span>
        <em>{eventDest}</em>
        <TimeAgo date={(build.created_at || build.enqueued_at) * 1000} formatter={formatter} />
      </p>
    );
  }
}
