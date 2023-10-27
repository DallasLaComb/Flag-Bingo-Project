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
  for (let i = 0; i < countryData.length; i++) {
    let countryCode = countryData[i].countryCode.toLowerCase(); // country code is used for the image source. EX: us.png == ${countryCode}.png
    let continent = countryData[i].continent; // continent is used to determine which div the country will be appended to: EX: NA == .na, EU == .eu, etc.
    let countryName = countryData[i].countryName; // countryName is used to display the country name on the page: EX: United States
    let countryImage = `<img class="img-fluid" src="imagesSmall/${countryCode}.png">`; // countryImage is used to display the country flag on the page: EX: <img src="imagesSmall/us.png"> displays US Flag
    // newelement is the div that is created for each country. It is appended to the appropriate continent div.
    // EX: <div class='col-2-sm pt-3 border-top mt-3' id='us'>United States<br><img class="img-fluid" src="imagesSmall/us.png"></div>
    // newElements also get added new on click functionality.
    let selectedFlags = [];
    let newElement = $(
      `<div class='col-2-sm pt-3 border-top mt-3' id='${countryCode}'>${countryName}<br class ="hidden">${countryImage}<i class="bi bi-app "></i></div>`
    ).on("click", function () {
      if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        $(this).children().removeClass("bi-check-square");
      } else {
        $(this).children().addClass("bi-check-square");
        $(this).addClass("selected");
        selectedFlags.push(this);
      }
    });

    // Appends the newElement div to the appropriate continent div. Appends means to add to the end of the current html div.
    switch (continent) {
      case "NA":
        $(".na").append(newElement);
        break;
      case "EU":
        $(".eu").append(newElement);
        break;
      case "AS":
        $(".as").append(newElement);
        break;
      case "AF":
        $(".af").append(newElement);
        break;
      case "SA":
        $(".sa").append(newElement);
        break;
      case "OC":
        $(".au").append(newElement);
        break;
    }
  }
}
loadData(processData);
//WHEN SAVE IS CLICKED LOAD THE CALL GENERATOR STUFF
// LOGIC WILL CHANGE SLIGHTLY BELOW AFTER DOING THE COOKIES I THINK
// $("#save-button").on("click", function(){
//     $("i").remove();
//     $(".callGenerator").removeClass("deactivate");
//     $(".play-button").addClass("deactivate");
//     $(".flagSelectionContainer").addClass("deactivate");
//     $(".availableList").append(selectedFlags);
//     console.log(selectedFlags);

//     //Saves the country codes for each flag selected after the save button is clicked
//     let savedCountryCodes = [];
//     for(let i = 0; i < selectedFlags.length; i++){
//         savedCountryCodes[i] = $(selectedFlags[i]).attr('id');
//     }

//     //Flag names get saved to cookies
//     let flagsToCookies = JSON.stringify(savedCountryCodes);
//     Cookies.set('myCookie', flagsToCookies, {path: '/'})

//     let jsonString = Cookies.get('myCookie');
//     let retrievedCookies = JSON.parse(jsonString);
//     console.log("Cookie Dump: " + retrievedCookies);

// })

// // Creating saved card tab

// $("#savedCards").on("click", function() {
//     $('body > :not(nav)').remove();
// // ADD ANYTHING FOR SAVED CARDS TAB BELOW THIS LINE
// })
// // let obj = [
// //     {"lobbyname":"aw,bs,cr,ca,cr"},
// // ]
