import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    // To get access to the token in the url, we use a prop that is provided
    // from react-router. match is the top-level property. params inside of it
    // is an object listing all the different wildcard tokens existing in the
    // url.
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    // Rather than doing
    // posts[this.props.match.params.id];
    // which would make the component rely on the big list of posts, we want
    // to always expect that it will receive one single post.
    // See mapStateToProps below.

    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      // this.props === ownProps here.
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}>
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// The second argument is called ownProps by convention. It is the props
// object that is headed for the component. Whenever the component is about
// to be rendered or re-rendered, mapStateToProps gets called to figure out
// what props the component needs. mapStateToProps is passed all of the props
// that were headed to PostsShow.
function mapStateToProps({ posts }, ownProps) {
  // We are still dealing with the big list of posts here, so what's the diff-
  // erence between this and just using the full list in the render method?
  // In larger apps, sometimes mapStateToProps functions are created in a
  // separate file. If we took that approach, then the PostsShow file would
  // only be responsible for showing the component and not doing much else,
  // and only the mapStateToProps would deal with the big list. Also, when
  // we do it this way we can just refer to this.props.post in other functions,
  // instead of this.props.posts[this.props.match.params.id].
  //
  // Also note: because the data is fetched in componentDidMount, the component
  // gets rendered once before that without any data. The line below will
  // return undefined. To get around this, we check for the presence of post
  // in the render method.
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
