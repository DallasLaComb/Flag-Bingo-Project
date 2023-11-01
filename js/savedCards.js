$(function () {
  $("#navbar-placeholder").load("navbar.html");
});
// ^^ Loads navbar.html into the navbar-placeholder div.
let jsonString = Cookies.get("lobbyData");
console.log(jsonString);
let jsonData = JSON.parse(jsonString);
// jsonData == [{lobbyName: "Test", countryCodes: ["us", "ca"]}, {lobbyName: "Test2", countryCodes: ["us", "ca"]}];
$(jsonData).each(function (index, value) {
  let lobbyName = value.lobbyName;
  console.log(lobbyName);
  $("#saved-lobbies").append(`
    <div class="row border shadow m-3">
        <div class="col-3 my-auto">
            <h2>${lobbyName}</h2>
        </div>
        <div class="col-2 my-auto btn">
            <h1 id=${index} ><i class="bi bi-dice-5"></i><span class="ps-2">Play</span></h1>
        </div>
        <div class="col-2 my-auto btn">
            <h1><i class="bi bi-printer"></i><span class="ps-2">Print</span></h1>
        </div>
        <div class="col-2 my-auto btn">
            <h1><i class="bi bi-pencil-square"></i><span class="ps-2">Edit</span></h2>
        </div>
        <div class="col-3 my-auto btn">
            <h1><i class="bi bi-x-square"></i><span class="ps-2">Delete</span></h2>
        </div>
  `);
  console.log(index, value);
  // console.log(jsonData[index].countryCodes[o]);
  $(`#${index}`).on("click", function () {
    $("body > :not(nav)").remove();

    $("body").append(`
    <div class="container" id="callGenerator">
        <!-- ^^ Container = Bootstrap. | callGenerator id is used as a selector in index.js. | It is selected to take off class deactivate, which is a class made in index.css to hide elements from user. This gives the appearance of multiple screens even though it's just one. -->
      <div class="row">
      <!-- ^^ Bootstrap Class -->
        <div class="btn btn-primary shadow mx-auto col-2 mb-3" id="callButton">
        <!-- ^^ Bootstrap Class. ID Call button will be used as a selector in index.js...Will have oncClick then do this logic to it... -->
          Call
        </div>
        <div class="row">
        <!-- ^^ Bootstrap Class -->
          <div class="col border" id="alreadyCalled"><h1>Already Called:</h1></div>
          <div class="col border" id="currentCall"><h1>Current Call</h1></div>
          <div class="col border" id="availableList"><h1>Available List:</h1></div>
          <!-- ^^ Bootstrap Classes. ID's are selected in the index.js and given logic to them. -->
    
        </div>
      </div>
    </div>`);
    for (let i = 0; i < jsonData[index].countryCodes.length; i++) {
      console.log("CURRENT CONSOLE LOG: " + jsonData[index].countryCodes[i] + jsonData[index]);
      // ^^ This is how to get each individual country code for selection...

      $(".availableList").append(jsonData[index].countryCodes[i]);
      let countryCode = jsonData[index].countryCodes[i]; // country code is used for the image source. EX: us.png == ${countryCode}.png
      let countryName = jsonData[index].countryName[i]; // countryName is used to display the country name on the page: EX: United States
      let countryImage = `<img class="img-fluid" src="flagImages/${countryCode}.png" alt=>`; // countryImage is used to display the country flag on the page: EX: <img src="imagesSmall/us.png"> displays US Flag

      let newCountryCard = $(
        `<div class='col-2-sm pt-3 border-top mt-3' id=${countryCode[i]}> ${countryName} <br class ="hidden">${countryImage}</div>`
      )
      $("#availableList").append(newCountryCard);
    }
  });
});


