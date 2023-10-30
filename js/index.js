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
    let countryImage = `<img class="img-fluid" src="imagesSmall/${countryCode}.png" alt=${countryName}>`; // countryImage is used to display the country flag on the page: EX: <img src="imagesSmall/us.png"> displays US Flag

    let newCountryCard = $(
      `<div class='col-2-sm pt-3 border-top mt-3' id=${countryCode}>${countryName}<br class ="hidden">${countryImage}<i class="bi bi-app"></i></div>`
    ).on("click", function () {
      if ($(this).hasClass("selected")) {
        let index = selectedFlags.indexOf(this);
        selectedFlags.splice(index, 1);
        $(this).removeClass("selected");

        $(this).children().removeClass("bi-check-square");
        // console.log(selectedFlags);
      } else {
        $(this).children().addClass("bi-check-square");
        $(this).addClass("selected");
        console.log(this);
        selectedFlags.push(this);
        // console.log(selectedFlags);
      }
    });
    // ^^ newCountryCard is the div that is created for each country. It is appended to the appropriate continent div.
    // EX: <div class='col-2-sm pt-3 border-top mt-3' id='us'>United States<br><img class="img-fluid" src="imagesSmall/us.png"></div>
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
  // ^^ Ending brackect of for loop that creates newCountryCards for each country from the data in the json file.
  $("#save-button").on("click", function () {
    $("body > :not(nav)").remove();
    // ^^ This removes everything from the body except for the navbar.
    $("body").append(
      `<div class="container border shadow p-4">
        <h1>What name do you want to give to save your card selection?</h1>
        <div class="row">
          <div class="col-6 mx-auto text-center pb-3">
            <div class="input-group">
              <input type="text" id="my-input" class="form-control" placeholder="Enter name">
              <div class="input-group-append">
                <button class="btn btn-primary" id="submit" type="button">Submit</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-center"></div>
        </div>
      </div>`
    );
    let savedCountryCodes = [];
    let cookieArray = [];
    let countryName = [];
    $("#submit").on("click", function() {
        let userinput = $("#my-input").val();
        console.log("User input:", userinput);
    
        for (let i = 0; i < selectedFlags.length; i++) {
            savedCountryCodes[i] = $(selectedFlags[i]).attr("id");
            countryName[i] =  $(selectedFlags[i]).text();
        }
        console.log("Saved country codes:", savedCountryCodes);
    
        let lobbyData = {
            lobbyName: userinput,
            countryCodes: savedCountryCodes,
            countryName: countryName
        };
        console.log("Lobby data:", lobbyData);
    
        if (getCookie("lobbyData") == null) {
            console.log("No previous cookie found. Setting new cookie...");
            cookieArray.push(lobbyData);
            setCookie("lobbyData", JSON.stringify(cookieArray));
        } else {
            try {
                let previousCookie = getCookie("lobbyData");
                console.log("Previous cookie data:", previousCookie);
                let existingData = JSON.parse(previousCookie);
                console.log("Parsed existing cookie data:", existingData);
                
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
    
  

  });
}
  
  // ^^ Ending bracket of processData function.
  loadData(processData);
  
  // Helper function to set a cookie with a name and value
  function setCookie(name, value) {
    var expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 100);  // Setting expiry date to 10 years in the future
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
  // console.log(getCookie("lobbyData"));
// ^^ The end of the hompage code. Code below this is for the other tabs...


// // ^^ save-button id is the button in the bottom right that says "Saved Cards".
// // ^^ When "Saved Cards" is clicked, the selectedFlags array is appended to the .availableList div.
// // ^^ The logic on this is going to change a lot, but for now, it removes the save button and the flags from the page, and adds the selectedFlags array to the .availableList div.
// // let savedCountryCodes = [];
// // Array that will hold the country codes of the selected flags.
// for (let i = 0; i < selectedFlags.length; i++) {
//   savedCountryCodes[i] = $(selectedFlags[i]).attr("id");
//   // ^^ This for loop traverses through the selectedFlags array and adds the country codes (which is given to them as an ID) to the savedCountryCodes array.
//   // console.log("Saved Country Codes: " + savedCountryCodes[i]);
// }
// let flagsToCookies = JSON.stringify(savedCountryCodes);
// // ^^ This converts the savedCountryCodes array into a string so that it can be stored in a cookie.
// Cookies.set("myCookie", flagsToCookies, { path: "/" });
// // ^^ This sets the cookie. The first parameter is the name of the cookie, the second parameter is the value of the cookie, and the third parameter is the path of the cookie.
