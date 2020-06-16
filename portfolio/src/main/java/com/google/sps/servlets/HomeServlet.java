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
public class HomeServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    Gson gson = new Gson();

    UserService userService = UserServiceFactory.getUserService();
    if (userService.isUserLoggedIn()) {
      boolean isUserLoggedIn = true;
      String logoutURL = userService.createLogoutURL(redirectAfterLogout);

      AuthenticationInfo userLoginStatus = new AuthenticationInfo(isUserLoggedIn, logoutURL);
      response.getWriter().println(gson.toJson(userLoginStatus));
    } else {
      boolean isUserLoggedIn = false;
      String loginURL = userService.createLoginURL(redirectAfterLogin);

      AuthenticationInfo userLoginStatus = new AuthenticationInfo(isUserLoggedIn, loginURL);
      response.getWriter().println(gson.toJson(userLoginStatus));
    }
  }
}