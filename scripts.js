 // Client ID and API key from the Developer Console
 var CLIENT_ID = '65468664004-1ricucbt8rkfcudnri1s93u06qk6ps63.apps.googleusercontent.com';
 var API_KEY = 'AIzaSyB5Jgq0cooeQNrxFF53NBJ0myZUIUj1I7A';
 // Array of API discovery doc URLs for APIs used by the quickstart
 var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
 // Authorization scopes required by the API; multiple scopes can be
 // included, separated by spaces.
 var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
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
     listUpcomingEvents();
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

// index.html

var i = 0;
var txt =  'A simple tool to organize your college applications.';
var speed = 50;

function writeTitleText() {
  if (i < txt.length) {
    document.getElementById("titleText").innerHTML += txt.charAt(i);
    i++;
    setTimeout(writeTitleText, speed);
  }
}

function startGoing() {
    listUpcomingEvents();
}

function addTopic(id) {
  sessionStorage.setItem(id, true)
}

function getInfo(id) {
  if (sessionStorage.getItem(id) == true) {
    switch(id) {
/** users */
      case 'Junior':
        "1. Prepare and Take Standardized Tests 2. Consider Possible Majors 3. Research Colleges 4. Search for Scholarships 5. Plan to Maximize Summer 6. Get Good to Great Grades";
        break;
      case 'Senior':
/**    "1. Apply early to college 2. Reach out to your guidance counseolors 3. Start researching local scholarships 4. Do not let your grades slip! 5. Make deadlines adn stick to them! 6. Remember that you will end up where you're supposed to be.!" */
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
/**    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem" */
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

window.onload = function printInfo() {
  
  for (i=0; i<=sessionStorage.length-1; i++)  {  
        var key = sessionStorage.key(i);  
        document.getElementById('content').innerHTML = getInfo(key)
    }  
}
