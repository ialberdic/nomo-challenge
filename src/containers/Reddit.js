import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getRedditPosts } from '../actions/redditPosts';

class RedditPostsContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    redditPosts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    match: PropTypes.shape({ params: PropTypes.shape({}) }),
    fetchRedditPosts: PropTypes.func.isRequired
  }

  static defaultProps = {
    match: null,
  }

  state = {
    error: null,
    loading: false,
  }

  componentDidMount = () => this.fetchData();

  fetchData = (data) => {
    const { fetchRedditPosts } = this.props;

    this.setState({ loading: true });

    return fetchRedditPosts(data)
      .then(() => this.setState({
        loading: false,
        error: null,
      })).catch(err => this.setState({
        loading: false,
        error: err,
      }));
  }

  render = () => {
    const { Layout, redditPosts, match } = this.props;
    const { loading, error } = this.state;
    const id = (match && match.params && match.params.id) ? match.params.id : null;
    return (
      <Layout
        redditId={id}
        error={error}
        loading={loading}
        redditPosts={redditPosts}
        reFetch={() => this.fetchData()}
      />
    );
  }
}

const mapStateToProps = state => ({
  redditPosts: state.redditPosts.redditPosts || {},
});

const mapDispatchToProps = {
  fetchRedditPosts: getRedditPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(RedditPostsContainer);
