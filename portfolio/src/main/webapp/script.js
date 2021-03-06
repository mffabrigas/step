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
const GOOGLE_MTV = {lat: 37.4220041, lng: -122.0862515};

let cursor = true;
let editMarker;
let darkModeMap = new google.maps.StyledMapType(
  [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ],
{name: 'Dark Mode'});

function start() {
  checkIfUserIsLoggedIn();
  initMap();
}

function initMap() {
  const map = new google.maps.Map(
    document.getElementById('map'), {
      center: GOOGLE_MTV, 
      zoom: 15,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain','dark_mode']
      }
    }
  );
  map.mapTypes.set('dark_mode', darkModeMap);
  map.setMapTypeId('dark_mode');
}

function checkIfUserIsLoggedIn() {
  fetch('/login')
    .then(response => response.json())
    .then(userLoginStatus => {
      if(userLoginStatus.isLoggedIn) {
        loadWhenLoggedIn(userLoginStatus);
      } else {
        loadWhenLoggedOut(userLoginStatus);
      }
    });
}

/**
 * @param {Object} userLoginStatus JSON object holding login/out url
 */
function loadWhenLoggedIn(userLoginStatus) {
  let loginContainer = document.getElementById('login');
  let commentsContainer = document.getElementById('comment-section');

  loginContainer.style.display = 'block';
  loginContainer.appendChild(createLinkElement(userLoginStatus.logoutUrl, 'Logout here'));
  
  commentsContainer.style.display = 'block';
  loadComments();
}

/**
 * @param {Object} userLoginStatus JSON object holding login/out url
 */
function loadWhenLoggedOut(userLoginStatus) {
  let loginContainer = document.getElementById('login');

  loginContainer.style.display = 'block';
  loginContainer.appendChild(createLinkElement(userLoginStatus.loginUrl, 'Login here'));
}

/**
 * @param {number} numCommentsDisplayed number of comments to display
 */
function loadComments(numCommentsDisplayed) {
  if(numCommentsDisplayed === undefined) {
    numCommentsDisplayed = MAX_COMMENTS;
  }

  fetch('/data?numCommentsDisplayed=' + numCommentsDisplayed)
    .then(response => response.json())
    .then((commentList) => {
      const commentsContainer = document.getElementById('comments');
      commentsContainer.innerHTML = '';
      commentList.forEach((commentElement) => {
        commentsContainer.appendChild(createCommentElement(commentElement));
      });
    });
}

function deleteAllComments() {
  const deleteCommentsRequest = new Request('/delete-data', {method: 'POST'});
  fetch(deleteCommentsRequest)
    .then(response => loadComments());
}

/**
 * @param {Array} content text to put into a comment element
 */
function createCommentElement(content) {
  const listElement = document.createElement('p');
  listElement.innerText = '> ' + content.userEmail + ': ' + content.commentText;
  return listElement;
}

/**
 * @param {String} url url to be made into a link
 * @param {String} text text to displayed as link
 */
function createLinkElement(url, text) {
  const linkElement = document.createElement('a');
  linkElement.href = url;
  linkElement.innerText = '> ' + text;
  return linkElement;
}

setInterval(() => {
  if(cursor) {
    document.getElementById('cursor').style.opacity = 0;
    cursor = false;
  } else {
    document.getElementById('cursor').style.opacity = 1;
    cursor = true;
  }
}, SPEED);