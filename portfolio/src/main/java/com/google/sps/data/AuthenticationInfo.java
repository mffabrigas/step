package com.google.sps.data;

/** An object to hold authentication information*/
public final class AuthenticationInfo {

  private final boolean isLoggedIn;
  private final String loginUrl;
  private final String logoutUrl;

  public AuthenticationInfo(boolean isLoggedIn, String loginUrl, String logoutUrl) {
    this.isLoggedIn = isLoggedIn;
    this.loginUrl = loginUrl;
    this.logoutUrl = logoutUrl;
  }

  public static AuthenticationInfo createLoggedInInfo(String url) {
    return new AuthenticationInfo(true, "", url);
  }

  public static AuthenticationInfo createLoggedOutInfo(String url) {
    return new AuthenticationInfo(false, url, "");
  }
}