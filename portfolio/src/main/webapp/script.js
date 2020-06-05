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

let cursor = true;
const speed = 250;

setInterval(() => {
  if(cursor) {
    document.getElementById('cursor').style.opacity = 0;
    cursor = false;
  } else {
    document.getElementById('cursor').style.opacity = 1;
    cursor = true;
  }
}, speed);

function getComments() {
  const commentsPromise = fetch('/data');

  commentsPromise.then(responseHandler);
}

/**
 * @param {Promise} response A Promise from the servlet to get a JSON
 */
function responseHandler(response) {
  const textPromise = response.json();

  textPromise.then(addCommentsToDom);
}

/**
 * @param {JSON} comments parsed JSON from original Promise
 */
function addCommentsToDom(comments) {
  const commentsContainer = document.getElementById('comments');
  
  for(let i = 0; i < comments.length; i++) {
    commentsContainer.appendChild(
      createListElement(comments[i]));
  }
}

/**
 * @param {String} text text to put into a list element
 */
function createListElement(text) {
  const listElement = document.createElement('li');
  listElement.innerText = text;
  return listElement;
}