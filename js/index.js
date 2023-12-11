let flagCount = 0;

$(function () {
  $("#navbar-placeholder").load("navbar.html");
});
// ^^ Loads navbar.html into the navbar-placeholder div.
// Pulls the country data from the json file and stores it in the countryData variable.
let countryData = [];
function loadData(callback) {
  $.getJSON("js/countries.json", function (data) {
    countryData = data;
    callback();
  });
}
// The loadData function is slightly weird syntax, but it's to pass the values from the json file to the processData function.
function processData() {
  // processData function is where the countryData is processed and displayed on the page.
  // Create continent arrays in continents object.
  const continents = {
    na: [],
    eu: [],
    af: [],
    as: [],
    oc: [],
    sa: [],
  };
  // Traverse through countryData (object that stores the json file info) and push each country into the appropriate continent array.
  for (let country of countryData) {
    switch (country.continent) {
      case "NA":
        continents.na.push(country.countryName);
        break;
      case "EU":
        continents.eu.push(country.countryName);
        break;
      case "AF":
        continents.af.push(country.countryName);
        break;
      case "AS":
        continents.as.push(country.countryName);
        break;
      case "OC":
        continents.oc.push(country.countryName);
        break;
      case "SA":
        continents.sa.push(country.countryName);
        break;
    }
  }
  //   console.log(countryData);
  let selectedFlags = [];
  // Array that will hold the selected flags. This will be loaded into savedCountryCodes when the save button is clicked...
  for (let i = 0; i < countryData.length; i++) {
    let countryCode = countryData[i].countryCode.toLowerCase(); // country code is used for the image source. EX: us.png == ${countryCode}.png
    let continent = countryData[i].continent; // continent is used to determine which div the country will be appended to: EX: NA == .na, EU == .eu, etc.
    let countryName = countryData[i].countryName; // countryName is used to display the country name on the page: EX: United States
    let countryImage = `<img class="img-fluid" src="flagImages/${countryCode}.png" alt=${countryName}>`; // countryImage is used to display the country flag on the page: EX: <img src="flagImages/us.png"> displays US Flag

    let newCountryCard = $(
      `<div class='col-2-sm pt-3 border-top mt-3' id=${countryCode}>${countryName}<br class ="hidden">${countryImage}<i class="bi bi-app"></i></div>`
    ).on("click", function () {
      if ($(this).hasClass("selected")) {
        let index = selectedFlags.indexOf(this);
        selectedFlags.splice(index, 1);
        $(this).removeClass("selected");
        $(this).children().removeClass("bi-check-square");
        flagCount--;
        // console.log(selectedFlags);
      } else {
        $(this).children().addClass("bi-check-square");
        $(this).addClass("selected");
        selectedFlags.push(this);
        flagCount++;
        // console.log(selectedFlags);
      }
      console.log("Flag Count: " + flagCount);
    });
    // ^^ newCountryCard is the div that is created for each country. It is appended to the appropriate continent div.
    // EX: <div class='col-2-sm pt-3 border-top mt-3' id='us'>United States<br><img class="img-fluid" src="flagImages/us.png"></div>
    // newCountryCards also get added new on click functionality.
    // Appends the newCountryCard div to the appropriate continent div. Appends means to add to the end of the current html div.
    switch (continent) {
      case "NA":
        $("#na_").append(newCountryCard);
        break;
      case "EU":
        $("#eu_").append(newCountryCard);
        break;
      case "AS":
        $("#as_").append(newCountryCard);
        break;
      case "AF":
        $("#af_").append(newCountryCard);
        break;
      case "SA":
        $("#sa_").append(newCountryCard);
        break;
      case "OC":
        $("#au_").append(newCountryCard);
        break;
    }
  }

  window.injectSaveSetView = function(){
    $("body > :not(nav)").remove();
    // ^^ This removes everything from the body except for the navbar.
    $("body").append(
      `
      <div id="navbar-placeholder"></div>

      <div class="container border shadow p-4">
        <h1>What name do you want to give to save your card selection?</h1>
        <div class="row">
          <div class="col-6 mx-auto text-center pb-3">
            <div class="input-group">
              <input type="text" id="my-input" class="form-control" placeholder="Enter name">
              <div class="input-group-append">
                <button class="btn" id="submit-btn" type="button">Submit</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-center"></div>
        </div>
      </div>

      <!-- Back button -->
      <div class="container text-end" id="back-btn-container">
        <div class="btn rounded shadow text-end mx-5 my-3 btn-lg" id="back-btn">
          Back
        </div>
      </div>
      `
    );
  }
  // ^^ Ending brackect of for loop that creates newCountryCards for each country from the data in the json file.

  
  //When the 'Save Cards' button is clicked
  $("#save-button").on("click", function () {

    //Load the modal when the save button is clicked and flag selection is less than 24
    if(flagCount < 24){

      alert("You only have "+ flagCount +" flags selected. The total flag selection must be more than 23.");

    }else{

      window.injectSaveSetView();
      $("#navbar-placeholder").load("navbar.html");

      // Back button returns to the previous page
      $("#back-btn").on("click", function(){
        window.location.href = "index.html";
      });
  
      // ^^ When you click "Save Cards" this is the form that appears. It asks for a name to save the cards under.
      let savedCountryCodes = [];
      let cookieArray = [];
      let countryName = [];
      $("#submit-btn").on("click", function () {
        let userinput = $("#my-input").val();
        // console.log("User input:", userinput);
        for (let i = 0; i < selectedFlags.length; i++) {
          savedCountryCodes[i] = $(selectedFlags[i]).attr("id");
          countryName[i] = $(selectedFlags[i]).text();
        }
        // console.log("Saved country codes:", savedCountryCodes);
        let lobbyData = {
          lobbyName: userinput,
          countryCodes: savedCountryCodes,
          countryName: countryName
        };
        // The data we need for the "Saved Cards" page, this gets saved in a permanent cookie later...
        // console.log("Lobby data:", lobbyData);

        if (getCookie("lobbyData") == null) {
          // console.log("No previous cookie found. Setting new cookie...");
          cookieArray.push(lobbyData);
          setCookie("lobbyData", JSON.stringify(cookieArray));
          // Sets a new cookie if user doesn't currently have one.
        } else {
          try {
            // If user already has a cookie, we're gonna update the existing cookie.
            let previousCookie = getCookie("lobbyData");
            console.log("Previous cookie data:", previousCookie);
            let existingData = JSON.parse(previousCookie);
            // console.log("Parsed existing cookie data:", existingData);
            // Check if existingData is an array
            if (!Array.isArray(existingData)) {
              console.log("Existing data is not an array. Converting to array...");
              existingData = [existingData];
            }
            // existingData.length = 0;
            // ^^ Can be reused to reset cookies... Just comment line below when doing so too...
            existingData.push(lobbyData);
            console.log("Updated cookie data:", existingData);
            setCookie("lobbyData", JSON.stringify(existingData));
          } catch (e) {
            console.error("Error parsing existing cookie data:", e);
          }
        }
        window.location.href = "savedCards.html";
      });

    } // end else

  });
}
// ^^ Ending bracket of processData function.
loadData(processData);
// Helper function to set a cookie with a name and value
function setCookie(name, value) {
  var expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 100);  // Setting expiry date to 100 years in the future
  document.cookie = name + "=" + encodeURIComponent(value) +
    "; expires=" + expiryDate.toUTCString() +
    "; path=/";
}
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
// Helper function to get cookies that you have set earlier...






// Get the current document title
var pageTitle = document.title;

// Select the navigation links by their IDs
var generateGameLink = document.getElementById('generateGameLink');
var savedCardsLink = document.getElementById('savedCardsLink');
var howToPlayLink = document.getElementById('howToPlayLink');
var aboutLALCCLink = document.getElementById('aboutLALCCLink');

// Remove the "active" class from all links
generateGameLink.classList.remove('active');
savedCardsLink.classList.remove('active');
howToPlayLink.classList.remove('active');
aboutLALCCLink.classList.remove('active');

// Set the "active" class based on the document title
if (pageTitle === "Flag Bingo") {
  generateGameLink.classList.add('active');
} else if (pageTitle === "Saved Cards") {
  savedCardsLink.classList.add('active');
} else if (pageTitle === "How to Play") {
  howToPlayLink.classList.add('active');
} else if (pageTitle === "About LALCC") {
  aboutLALCCLink.classList.add('active');
}
