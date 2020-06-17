package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import com.google.sps.data.AuthenticationInfo;
import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/login")
public class AuthenticationServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    Gson gson = new Gson();

    UserService userService = UserServiceFactory.getUserService();
    if (userService.isUserLoggedIn()) {
      String redirectAfterLogout = "/";
      String logoutURL = userService.createLogoutURL(redirectAfterLogout);

      AuthenticationInfo userLoginStatus = AuthenticationInfo.createLoggedInInfo(logoutURL);
      response.getWriter().println(gson.toJson(userLoginStatus));
    } else {
      String redirectAfterLogin = "/";
      String loginURL = userService.createLoginURL(redirectAfterLogin);

      AuthenticationInfo userLoginStatus = AuthenticationInfo.createLoggedOutInfo(loginURL);
      response.getWriter().println(gson.toJson(userLoginStatus));
    }
  }
}