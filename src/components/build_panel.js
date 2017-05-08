import Humanize from './humanize';
import React from 'react';
import TimeAgo from 'react-timeago';
import zhStrings from 'react-timeago/lib/language-strings/zh-CN'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import './build_panel.less';

export default
class BuildPanel extends React.Component {

  renderParentLink(parent) {
    const {repo} = this.props;
    if (parent > 0) {
      return (
        <div>
          <em>上级：</em> #{parent}
          <a href={`/${repo.owner}/${repo.name}/${parent}`} className="parent-link">
            <i className="material-icons">insert_link</i>
          </a>
        </div>
      );
    }
  }

  render() {
    const { build, job } = this.props;
    const formatter = buildFormatter(zhStrings);

    let classes = ['build-panel', job.state || job.status];

    let environs = [];
    if (job && job.environ) {
      Object.keys(job.environ).map((key) => {
        environs.push(
          <code key={key}>{key}={job.environ[key]}</code>
        );
      });
    }

    let branch = (build.refspec != '' && build.event == 'pull_request') ?
      build.refspec : build.branch;

    return (
      <div className={classes.join(' ')}>
        <h1>#{build.number} <span>{build.message}</span></h1>
        <div className="build-panel-detail">
          <div>
            <div><em>分支：</em><span>{branch}</span></div>
            <div>
              <em>提交记录：</em><span>{build.commit.substr(0,8)}</span>
              <a href={build.link_url} target="_blank" className="commit-link">
                <i className="material-icons">insert_link</i>
              </a>
            </div>
            <div><em>作者：</em><span>{build.author}</span></div>
            {this.renderParentLink(build.parent)}
            <p>{environs}</p>
          </div>
          <div>
            <div>
              <i className="material-icons">access_time</i>
              {job.started_at ?
                <TimeAgo date={(job.started_at || build.created_at) * 1000} formatter={formatter} /> :
                <span>--</span>
              }
            </div>
            <div>
              <i className="material-icons">timelapse</i>
              {job.finished_at ?
                <Humanize finished={job.finished_at} start={job.started_at} /> :
                <TimeAgo date={(job.started_at || build.created_at) * 1000} formatter={formatter} />
              }
            </div>
          </div>
        </div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
