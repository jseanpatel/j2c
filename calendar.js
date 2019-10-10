// Client ID and API key from the Developer Console
var CLIENT_ID = '709658249756-57gopr6l3b70jdhd0di5q5qp5c961vrr.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBJOoEm9jZWTcdsJkfeVNVXvTF7HZD00dg';
// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar.events";
var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
/**
 *  On load, called to load the auth2 library and API client library.
 */

 
function handleClientLoad() {
      gapi.load('client:auth2', initClient);
}
/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {

      gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
      }).then(function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            authorizeButton.onclick = handleAuthClick;
            signoutButton.onclick = handleSignoutClick;
      }, function (error) {
            appendPre(JSON.stringify(error, null, 2));
      });
}
/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
            authorizeButton.style.display = 'none';
            signoutButton.style.display = 'block';
            // listUpcomingEvents();
      } else {
            authorizeButton.style.display = 'block';
            signoutButton.style.display = 'none';
      }
}
/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
      gapi.auth2.getAuthInstance().signIn();
}
/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
      gapi.auth2.getAuthInstance().signOut();
}
/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
      var pre = document.getElementById('content');
      var textContent = document.createTextNode(message + '\n');
      pre.appendChild(textContent);
}
/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
      gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
      }).then(function (response) {
            var events = response.result.items;
            appendPre('Upcoming events:');
            if (events.length > 0) {
                  for (i = 0; i < events.length; i++) {
                        var event = events[i];
                        var when = event.start.dateTime;
                        if (!when) {
                              when = event.start.date;
                        }
                        appendPre(event.summary + ' (' + when + ')')
                  }
            } else {
                  appendPre('No upcoming events found.');
            }
      });
}

function makeEvent(id) {
      var eventInformation = getEventInfo(id)
      var event = {
            'summary': eventInformation[0],
            'location': eventInformation[1],
            'description': eventInformation[2],
            'start': {
                  // '2019-05-24T04:00:00-00:00' ------> 2019-05-28T16:00:00-00:00'
                  'dateTime': eventInformation[3],
                  'timeZone': 'America/New_York'
            },
            'end': {
                  'dateTime': eventInformation[4],
                  'timeZone': 'America/New_York'
            },
            'recurrence': [
                  'RRULE:FREQ=DAILY;COUNT=1'
            ],
            'attendees': [

            ],
            'reminders': {
                  'useDefault': false,
                  'overrides': [
                        { 'method': 'email', 'minutes': 24 * 60 },
                        { 'method': 'popup', 'minutes': 120 }
                  ]
            }
      };

      var request = gapi.client.calendar.events.insert({
            "calendarId": "primary",
            "resource": event
      });

      request.execute(function (event) {
            appendPre("Your events have been added to your calendar: " + event.htmlLink);
      });
}

function addEventsToCalendar() {
      for (i = 0; i <= sessionStorage.length - 1; i++) {
            var key = sessionStorage.key(i)
            makeEvent(key)
      }
}


var i = 0;
var speed = 50;


// 'A simple tool to organize your college applications.';
// 'A roadmap through the admissions process.'
var txt;

function writeTitleText() {
      txt = 'A simple tool to organize your college applications.';
      if (i < txt.length) {
            document.getElementById("titleText").innerHTML += txt.charAt(i);
            i++;
            setTimeout(writeTitleText, speed);
      }
}

var x = 0;

function writeTitleTextJ2C() {
      txt = 'A roadmap through the admissions process.';
      if (x < txt.length) {
            document.getElementById("titleTextJ2C").innerHTML += txt.charAt(x);
            x++;
            setTimeout(writeTitleTextJ2C, speed);
      }
}

function startGoing() {
      listUpcomingEvents();
}

function addTopic(id) {
      sessionStorage.setItem(id, true)
}

window.onload = function printInfo() {
      document.getElementById('content').innerHTML = "Here is your curated information based on your preferences." + "<br />" + "<br />"
      for (i = 0; i <= sessionStorage.length - 1; i++) {
            var key = sessionStorage.key(i);
            document.getElementById('content').innerHTML += formatKey(key) + " : "
            document.getElementById('content').innerHTML += getInfo(key) + "<br />" + "<br />"

      }
}

// Remove underscores and capitalize the first letters in each key.
function formatKey(key) {
      editedKey = key.replace(/_/g, " ");
      var capString = editedKey.toLowerCase().split(' ');
      for (var i = 0; i < capString.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            capString[i] = capString[i].charAt(0).toUpperCase() + capString[i].substring(1);
      }
      return capString.join(' ')
}

/**
  * Sample JavaScript code for calendar.events.insert
  * See instructions for running APIs Explorer code samples locally:
  * https://developers.google.com/explorer-help/guides/code_samples#javascript
  */

function authenticate() {
      return gapi.auth2.getAuthInstance()
            .signIn({ scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events" })
            .then(function () { console.log("Sign-in successful"); },
                  function (err) { console.error("Error signing in", err); });
}
function loadClient() {
      gapi.client.setApiKey("AIzaSyBJOoEm9jZWTcdsJkfeVNVXvTF7HZD00dg");
      return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest")
            .then(function () { console.log("GAPI client loaded for API"); },
                  function (err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute() {
      return gapi.client.calendar.events.insert({
            "resource": {
                  "end": {},
                  "start": {}
            }
      })
            .then(function (response) {
                  // Handle the results here (response.result has the parsed body).
                  console.log("Response", response);
            },
                  function (err) { console.error("Execute error", err); });
}

gapi.load("client:auth2", function () {
      gapi.auth2.init({ client_id:"709658249756-57gopr6l3b70jdhd0di5q5qp5c961vrr.apps.googleusercontent.com"});

});

// Event listener for the hamburger.
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
 
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
 
       // Add a click event on each of them
       $navbarBurgers.forEach(el => {
          el.addEventListener('click', () => {
 
             // Get the target from the "data-target" attribute
             const target = el.dataset.target;
             const $target = document.getElementById(target);
 
             // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
             el.classList.toggle('is-active');
             $target.classList.toggle('is-active');
 
          });
       });
    }
 
 });