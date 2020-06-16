package com.google.sps.data;

/** An object to hold authentication information*/
public final class AuthenticationInfo {

  private final boolean isLoggedIn;
  private final String loginUrl;
  private final String logoutUrl;

  public Task(boolean isLoggedIn, String url) {
    this.isLoggedIn = isLoggedIn;
    
    if(isLoggedIn) {
      this.loginUrl = url;
      this.logoutUrl = "";
    } else {
      this.logoutUrl = url;
      this.loginUrl = "";
    }
  }
}