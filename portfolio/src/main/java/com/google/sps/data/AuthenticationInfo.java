package com.google.sps.data;

/** An object to hold authentication information*/
public final class AuthenticationInfo {

  private final boolean isLoggedIn;
  private final String loginUrl;
  private final String logoutUrl;

  public AuthenticationInfo(boolean isLoggedIn, String url) {
    this.isLoggedIn = isLoggedIn;
    
    if(isLoggedIn) {
      this.logoutUrl = url;
      this.loginUrl = "";
    } else {
      this.loginUrl = url;
      this.logoutUrl = "";
    }
  }
}