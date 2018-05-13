import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    // Use lodash's map function because it can deal with objects.
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          {post.title}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

// Whenever we want to consume anything from application-level state,
// we always define mapStateToProps.
function mapStateToProps(state) {
  return { posts: state.posts };
}

// Rather than defining a separate mapDispatchToProps function, we can
// do this. We still have access to this.props.fetchPosts inside the
// component.
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
