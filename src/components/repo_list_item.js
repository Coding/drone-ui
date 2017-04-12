import Humanize from './humanize';
import React from 'react';
import Status from './status';
import TimeAgo from 'react-timeago';
import zhStrings from 'react-timeago/lib/language-strings/zh-CN'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import './repo_list_item.less';

export default
class RepoListItem extends React.Component {
  render() {
    const { repo } = this.props;
    const formatter = buildFormatter(zhStrings);

    return (
      <div className="repo-list-item">
        <div className="repo-list-item-header">
          <h1>{repo.full_name}</h1>
          <Status state={repo.status} />
        </div>
        <div className="repo-list-item-body">
          <div>
            <i className="material-icons">access_time</i>
            {repo.started_at || repo.created_at ?
              <TimeAgo date={(repo.started_at || repo.created_at) * 1000} formatter={formatter} /> :
              <span>--</span>
            }
          </div>
          <div>
            <i className="material-icons">timelapse</i>
            {repo.finished_at ?
              <Humanize finished={repo.finished_at} start={repo.started_at} /> :
              repo.started_at ?
                <TimeAgo date={(repo.started_at || repo.created_at) * 1000} formatter={formatter} /> :
                <span>--</span>
            }
          </div>
        </div>
      </div>
    );
  }
}
