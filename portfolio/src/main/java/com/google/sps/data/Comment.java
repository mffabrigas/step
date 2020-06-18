package com.google.sps.data;

/** An object to hold authentication information*/
public final class Comment {

  private final String userEmail;
  private final String commentText;

  public Comment(String userEmail, String commentText) {
    this.userEmail = userEmail;
    this.commentText = commentText;
  }

  public double getUserEmail() {
    return userEmail;
  }

  public double getCommentText() {
    return commentText;
  }
}