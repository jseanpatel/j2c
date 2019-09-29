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


// For getting the insight information.

function getInfo(id) {
      if (sessionStorage.getItem(id)) {
            switch (id) {
                  /** users */
                  case 'Junior':
                        return "1. Prepare and take standardized tests 2. Consider possible majors 3. Research colleges 4. Search for scholarships 5. Plan to maximize summer 6. Get good to great grades";
                  case 'Senior':
                        return 'Apply early to college 2. Reach out to your guidance counseolors 3. Start researching local scholarships 4. Do not let your grades slip! 5. Make deadlines adn stick to them! 6. Remember that you will end up where you are supposed to be!';
                  case 'Teacher':
                  /**    "1. Open with a formal introduction 2. Only write reccomendations for students that deserve them 3. Require requests by a certain date 4. Ask the student about their goals" */
                  case 'Parent':
                  /**    "1. Remember that this is your child's process 2. Be supportive and an open ear 3. Have the tough conversations about finances with your children 4. Remind your child that happiness is the most important factor" */
                  /** Information Search */
                  case 'where_to_start':
                  /**    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" */
                  case 'general_process':
                  /**    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident." */
                  case 'where_to_apply':
                  /**    "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae" */
                  case 'scholarships':
                  /**    "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat" */
                  case 'essay':
                  /**    "Et harum quidem rerum facilis est et expedita distinctio." */
                  case 'common_app':
                        return "1. Start as early as August 1st by just inputting basic information 2. Utilize the to do list functions and to keep track of deadlines 3. Create one email to use for all CommonApp accounts 4. Look for warning messages 5. Call the college if you have any questions - chances are other people have the same problems.";
                  /**    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." */
                  /** State Search */
                  case 'Alabama':
                  /**    "something about this state" */
                  case 'Alaska':
                  /**    "something about this state" */
                  case 'Arizona':
                  /**    "something about this state" */
                  case 'Arkansas':
                  /**    "something about this state" */
                  case 'California':
                  /**    "something about this state" */
                  case 'Colorado':
                  /**    "something about this state" */
                  case 'Connecticut':
                  /**    "something about this state" */
                  case 'Delaware':
                  /**    "something about this state" */
                  case 'Florida':
                  /**    "something about this state" */
                  case 'Georgia':
                  /**    "something about this state" */
                  case 'Hawaii':
                  /**    "something about this state" */
                  case 'Idaho':
                  /**    "something about this state" */
                  case 'Illinois':
                  /**    "something about this state" */
                  case 'Indiana':
                  /**    "something about this state" */
                  case 'Iowa':
                  /**    "something about this state" */
                  case 'Kansas':
                  /**    "something about this state" */
                  case 'Kentucky':
                  /**    "something about this state" */
                  case 'Louisiana':
                  /**    "something about this state" */
                  case 'Maine':
                  /**    "something about this state" */
                  case 'Maryland':
                  /**    "something about this state" */
                  case 'Massachusetts':
                  /**    "something about this state" */
                  case 'Michigan':
                  /**    "something about this state" */
                  case 'Minnesota':
                  /**    "something about this state" */
                  case 'Mississippi':
                  /**    "something about this state" */
                  case 'Missouri':
                  /**    "something about this state" */
                  case 'Montana':
                  /**    "something about this state" */
                  case 'Nebraska':
                  /**    "something about this state" */
                  case 'Nevada':
                  /**    "something about this state" */
                  case 'NewHampshire':
                  /**    "something about this state" */
                  case 'NewJersey':
                  /**    "something about this state" */
                  case 'NewMexico':
                  /**    "something about this state" */
                  case 'NewYork':
                  /**    "something about this state" */
                  case 'NorthCarolina':
                  /**    "something about this state" */
                  case 'NorthDakota':
                  /**    "something about this state" */
                  case 'Ohio':
                  /**    "something about this state" */
                  case 'Oklahoma':
                  /**    "something about this state" */
                  case 'Oregon':
                  /**    "something about this state" */
                  case 'Pennsylvania':
                  /**    "something about this state" */
                  case 'RhodeIsland':
                  /**    "something about this state" */
                  case 'SouthCarolina':
                  /**    "something about this state" */
                  case 'SouthDakota':
                  /**    "something about this state" */
                  case 'Tennessee':
                  /**    "something about this state" */
                  case 'Texas':
                  /**    "something about this state" */
                  case 'Utah':
                  /**    "something about this state" */
                  case 'Vermont':
                  /**    "something about this state" */
                  case 'Virginia':
                  /**    "something about this state" */
                  case 'Washington':
                  /**    "something about this state" */
                  case 'WestVirginia':
                  /**    "something about this state" */
                  case 'Wisconsin':
                  /**    "something about this state" */
                  case 'Wyoming':
                  /**    "something about this state" */
            }
      }
}

// For getting the event information.

function getEventInfo(id) {
      if (sessionStorage.getItem(id)) {
            switch (id) {
                  /** users */
                  case 'Junior':
                        return "1. Prepare and Take Standardized Tests 2. Consider Possible Majors 3. Research Colleges 4. Search for Scholarships 5. Plan to Maximize Summer 6. Get Good to Great Grades";
                  case 'Senior':
                        return 'Apply early to college 2. Reach out to your guidance counseolors 3. Start researching local scholarships 4. Do not let your grades slip! 5. Make deadlines adn stick to them! 6. Remember that you will end up where you are supposed to be!';
                  case 'Teacher':
                  /**    "1. Open with a formal introduction 2. Only write reccomendations for students that deserve them 3. Require requests by a certain date 4. Ask the student about their goals" */
                  case 'Parent':
                  /**    "1. Remember that this is your child's process 2. Be supportive and an open ear 3. Have the tough conversations about finances with your children 4. Remind your child that happiness is the most important factor" */
                  /** Information Search */
                  case 'where_to_start':
                  /**    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua" */
                  case 'general_process':
                  /**    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident." */
                  case 'where_to_apply':
                  /**    "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae" */
                  case 'scholarships':
                  /**    "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat" */
                  case 'essay':
                  /**    "Et harum quidem rerum facilis est et expedita distinctio." */
                  case 'common_app':
                        return ['The Common Application/ Coalition Application Deadline', 'Your dream college.', 'The Common App is a nationally standardized application tool where you will choose and fill out college applications', '2020-01-01T04:00:00-00:00', '2020-01-01T16:00:00-00:00'];
                  case 'recc_letters':
                  /**    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." */
                  /** State Search */
                  case 'Alabama':
                  /**    "something about this state" */
                  case 'Alaska':
                  /**    "something about this state" */
                  case 'Arizona':
                  /**    "something about this state" */
                  case 'Arkansas':
                  /**    "something about this state" */
                  case 'California':
                  /**    "something about this state" */
                  case 'Colorado':
                  /**    "something about this state" */
                  case 'Connecticut':
                  /**    "something about this state" */
                  case 'Delaware':
                  /**    "something about this state" */
                  case 'Florida':
                  /**    "something about this state" */
                  case 'Georgia':
                  /**    "something about this state" */
                  case 'Hawaii':
                  /**    "something about this state" */
                  case 'Idaho':
                  /**    "something about this state" */
                  case 'Illinois':
                  /**    "something about this state" */
                  case 'Indiana':
                  /**    "something about this state" */
                  case 'Iowa':
                  /**    "something about this state" */
                  case 'Kansas':
                  /**    "something about this state" */
                  case 'Kentucky':
                  /**    "something about this state" */
                  case 'Louisiana':
                  /**    "something about this state" */
                  case 'Maine':
                  /**    "something about this state" */
                  case 'Maryland':
                  /**    "something about this state" */
                  case 'Massachusetts':
                  /**    "something about this state" */
                  case 'Michigan':
                  /**    "something about this state" */
                  case 'Minnesota':
                  /**    "something about this state" */
                  case 'Mississippi':
                  /**    "something about this state" */
                  case 'Missouri':
                  /**    "something about this state" */
                  case 'Montana':
                  /**    "something about this state" */
                  case 'Nebraska':
                  /**    "something about this state" */
                  case 'Nevada':
                  /**    "something about this state" */
                  case 'NewHampshire':
                  /**    "something about this state" */
                  case 'NewJersey':
                  /**    "something about this state" */
                  case 'NewMexico':
                  /**    "something about this state" */
                  case 'NewYork':
                  /**    "something about this state" */
                  case 'NorthCarolina':
                  /**    "something about this state" */
                  case 'NorthDakota':
                  /**    "something about this state" */
                  case 'Ohio':
                  /**    "something about this state" */
                  case 'Oklahoma':
                  /**    "something about this state" */
                  case 'Oregon':
                  /**    "something about this state" */
                  case 'Pennsylvania':
                  /**    "something about this state" */
                  case 'RhodeIsland':
                  /**    "something about this state" */
                  case 'SouthCarolina':
                  /**    "something about this state" */
                  case 'SouthDakota':
                  /**    "something about this state" */
                  case 'Tennessee':
                  /**    "something about this state" */
                  case 'Texas':
                  /**    "something about this state" */
                  case 'Utah':
                  /**    "something about this state" */
                  case 'Vermont':
                  /**    "something about this state" */
                  case 'Virginia':
                  /**    "something about this state" */
                  case 'Washington':
                  /**    "something about this state" */
                  case 'WestVirginia':
                  /**    "something about this state" */
                  case 'Wisconsin':
                  /**    "something about this state" */
                  case 'Wyoming':
                  /**    "something about this state" */
            }
      }
}