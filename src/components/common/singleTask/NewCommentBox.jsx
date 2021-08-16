import React from "react";

export default function NewCommentBox() {
  const handleClick = () => {
    this.setState({
      showComments: !this.state.showComments,
    });
  };

  const getComments = () => {
    return comments.map((comment) => {
      return (
        <Comment author={comment.author} body={comment.body} key={comment.id} />
      );
    });
  };

  const getCommentsTitle = (commentCount) => {
    if (commentCount === 0) {
      return "No comments yet";
    } else if (commentCount === 1) {
      return "1 comment";
    } else {
      return `${commentCount} comments`;
    }
  };
  const comments = getComments();
  let commentNodes;
  let buttonText = "Show Comments";

  if (showComments) {
    buttonText = "Hide Comments";
    commentNodes = <div className="comment-list">{comments}</div>;
  }

  return (
    <div className="comment-box">
      <h2>Join the Discussion!</h2>
      <CommentForm addComment={this._addComment.bind(this)} />
      <button id="comment-reveal" onClick={this._handleClick.bind(this)}>
        {buttonText}
      </button>
      <h3>Comments</h3>
      <h4 className="comment-count">{getCommentsTitle(comments.length)}</h4>
      {commentNodes}
    </div>
  );
} // end render

function CommentForm() {
  const handleSubmit = (event) => {
    event.preventDefault(); // prevents page from reloading on submit
    let author = this._author;
    let body = this._body;
    this.props.addComment(author.value, body.value);
  };
  return (
    <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
      <div className="comment-form-fields">
        <input
          placeholder="Name"
          required
          ref={(input) => (this._author = input)}
        ></input>
        <br />
        <textarea
          placeholder="Comment"
          rows="4"
          required
          ref={(textarea) => (this._body = textarea)}
        ></textarea>
      </div>
      <div className="comment-form-actions">
        <button type="submit">Post Comment</button>
      </div>
    </form>
  );
}
import React from "react";

function Comment() {
  const deleteComment = () => {
    alert("-- DELETE Comment Functionality COMMING SOON...");
  };
  return (
    <div className="comment">
      <p className="comment-header">{this.props.author}</p>
      <p className="comment-body">- {this.props.body}</p>
      <div className="comment-footer">
        <a
          href="#"
          className="comment-footer-delete"
          onClick={this._deleteComment}
        >
          Delete Comment
        </a>
      </div>
    </div>
  );
}
