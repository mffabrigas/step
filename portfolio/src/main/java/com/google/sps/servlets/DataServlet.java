// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  private static final String CONTENT_TEXT_PROPERTY_NAME ="content";
  private static final String TIMESTAMP_TEXT_PROPERTY_NAME = "timestamp";
  private static final int MAX_COMMENTS = 10;

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    int numCommentsDisplayed = getNumCommentsDisplayed(request);

    Query query = new Query("comment").addSort(TIMESTAMP_TEXT_PROPERTY_NAME, SortDirection.DESCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<String> demoComments = new ArrayList<String>();
    for(Entity entity : results.asIterable()) {
      String commentContent = (String) entity.getProperty(CONTENT_TEXT_PROPERTY_NAME);
      demoComments.add(commentContent);

      if(demoComments.size() == numCommentsDisplayed)  {
        break;
      }
    }

    Gson gson = new Gson();
    String json = gson.toJson(demoComments);
    
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String commentText = request.getParameter("write-comment");
    long commentTime = System.currentTimeMillis();

    Entity commentEntity = new Entity("comment");
    commentEntity.setProperty(CONTENT_TEXT_PROPERTY_NAME, commentText);
    commentEntity.setProperty(TIMESTAMP_TEXT_PROPERTY_NAME, commentTime);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(commentEntity);
    
    response.sendRedirect("/index.html");
  }

  private int getNumCommentsDisplayed(HttpServletRequest request) {
    String numCommentsDisplayedString = request.getParameter("numCommentsDisplayed");

    int numCommentsDisplayed;
    try {
      numCommentsDisplayed = Integer.parseInt(numCommentsDisplayedString);
    } catch (NumberFormatException e) {
      System.err.println("Could not convert to int: " + numCommentsDisplayedString);
      return MAX_COMMENTS;
    }

    if (numCommentsDisplayed < 1 || numCommentsDisplayed > 10) {
      System.err.println("Player choice is out of range: " + numCommentsDisplayedString);
      return MAX_COMMENTS;
    }

    return numCommentsDisplayed;
  }
}
