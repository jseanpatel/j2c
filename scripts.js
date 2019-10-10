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
                        return  "1. Open with a formal introduction 2. Only write reccomendations for students that deserve them 3. Require requests by a certain date 4. Ask the student about their goals";
                  case 'Parent':
                        return "1. Remember that this is your child's process 2. Be supportive and an open ear 3. Have the tough conversations about finances with your children 4. Remind your child that happiness is the most important factor";

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