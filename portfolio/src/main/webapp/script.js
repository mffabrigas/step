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

const SPEED = 250;
const MAX_COMMENTS = 10;

let cursor = true;

setInterval(() => {
  if(cursor) {
    document.getElementById('cursor').style.opacity = 0;
    cursor = false;
  } else {
    document.getElementById('cursor').style.opacity = 1;
    cursor = true;
  }
}, SPEED);

function start() {
  loadComments();
  createMap();
}

function createMap() {
  const map = new google.maps.Map(
    document.getElementById('map'), 
    {center: {lat: 37.4220041, lng: -122.0862515}, zoom: 15});
}

/**
 * @param {number} numCommentsDisplayed number of comments to display
 */
function loadComments(numCommentsDisplayed) {
  if(numCommentsDisplayed === undefined) {
    numCommentsDisplayed = MAX_COMMENTS;
  }

  fetch('/data?numCommentsDisplayed=' + numCommentsDisplayed).then(response => response.json()).then((commentList) => {
    const commentsContainer = document.getElementById('comment-section');
    commentsContainer.innerHTML = '';
    commentList.forEach((comment) => {
      commentsContainer.appendChild(createListElement(comment));
    })
  });
}

function deleteAllComments() {
  const deleteCommentsRequest = new Request('/delete-data', {method: 'POST'});
  fetch(deleteCommentsRequest).then(response => loadComments());
}

/**
 * @param {String} text text to put into a list element
 */
function createListElement(text) {
  const listElement = document.createElement('li');
  listElement.innerText = text;
  return listElement;
}