// This is for testing git commit messages...
$(document).ready(function() {
  editSet();
  printSet();
});

let countryCardsArray = []; //Global variable for call generator
let currentCallArray = []; //Global variable for call generator
let alreadyCalledArray = []; //Global variable for call generator
//Loads navbar.html into the navbar-placeholder div.
$(function(){
  $("#navbar-placeholder").load("navbar.html", function() {
      // Get the current path
      var currentPath = window.location.pathname;

      // Get all nav-link elements
      var navLinks = document.querySelectorAll('.nav-item .nav-link');

      // Iterate over each link
      navLinks.forEach(function(link) {
          var linkPath = new URL(link.getAttribute('href'), window.location.href).pathname;

          // Check if the link's path matches the current path
          if (currentPath === linkPath) {
              // Add the 'active' class to the matching link
              link.classList.add('active');
          } else {
              // Remove the 'active' class from other links
              link.classList.remove('active');
          }
      });
  });
});

let jsonString = Cookies.get("lobbyData");
let jsonData = JSON.parse(jsonString);
let lobbyName;

$("#deleteModal").load("deleteSetModal.html");
$("#printmodal").load("printmodal.html");

function savedSetView(index, lobbyName) {
  $("#saved-lobbies").append(`
  <div class="row border shadow m-3">
      <div class="col-3 my-auto">
          <h2>${lobbyName}</h2>
      </div>
      <div class="col-2 my-auto btn play-btn" data-index="${index}">
          <h1><i class="bi bi-dice-5"></i><span class="ps-2">Play</span></h1>
      </div>
      <button type="button" class="col-2 my-auto btn printbtn"  data-bs-target="#staticPrintModal" data-index="${index}">
          <h1><i class="bi bi-printer "></i><span class="ps-2">Print</span></h1>
      </button>
      <button type="button" class="col-2 my-auto btn edit-btn" data-lobby-name="${lobbyName}">
        <h1><i class="bi bi-pencil-square"></i><span class="ps-2">Edit</span></h1>
      </button>
      <button type="button" class="col-3 my-auto btn delete-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-lobby-name="${lobbyName}" data-index="${index}">
        <h1><i class="bi bi-x-square"></i><span class="ps-2">Delete</span></h1>
      </button>
  `);
}

function deleteSet(index) {
  console.log("index"+ index)
  console.log("deleteSet() called")
  // Store the index on the #modal-delete element
  $("#modal-delete").data("index", index);
  $(document).on("click", "#modal-delete", function () {
    // Retrieve the index from the #modal-delete element
    let index = $(this).data("index");
    // Perform the deletion of the set from the browser's cookies
    try {
      deleteObjectFromCookie("lobbyData", "lobbyName", index);
      // console.log("Deleted set at index: " + index)
      location.reload();
    } catch (error) {
      console.error("Error occurred while deleting from the cookie:", error);
    }
  });
}

function editSet() {
  $(".edit-btn").on("click", function () {
    let currentSetName = $(this).data("lobby-name");
    window.injectSaveSetView();

    $(document).on("click", "#submit-btn", function () {
      let newSetName = $("#my-input").val();
      jsonData.forEach((item) => {
        if (item.lobbyName === currentSetName) {
          item.lobbyName = newSetName;
        }
      });
      setCookie("lobbyData", JSON.stringify(jsonData));
      $(".row").each(function (index) {
        if ($(this).find("h2").text() === currentSetName) {
          $(this).find("h2").text(newSetName);
        }
      });
      window.location.href = "savedCards.html";
    });
    $("#back-btn").on("click", function () {
      window.location.href = "index.html";
    });
  });
}

function printSet() {
  $(".printbtn").on("click", function () {
    let index = $(this).data("index");
    console.log("Printing set: " + index);
    let cookieValue = getCookie("lobbyData");

        try {
          toggleForPrintPageSetUp(index); 
          // setTimeout(function () {
          //   location.reload();
          // }, 501);
        }
        catch (error) {
          console.error("Error", error);
        }
  });
}

function playGame(index) {
  console.log("Play game called");
  //This removes everything from the body except for the navbar.
  $("body > :not(#navbar-placeholder)").remove();
    // This adds the "Call Generator" container to the body of the page
    $("body").append(`
      <div class="container" id="callGenerator">


          <!-- ^^ Container = Bootstrap. | callGenerator id is used as a selector in index.js. | It is selected to take off class deactivate, which is a class made in index.css to hide elements from user. This gives the appearance of multiple screens even though it's just one. -->
          <div class="row justify-content-center">
          <!-- Bootstrap Class to center content -->
          <div class="col-auto mb-3 me-3">
            <!-- Bootstrap margin classes: mb-3 for bottom margin, me-3 for right margin (margin-end) -->
            <div class="btn shadow" id="callButton">
              Call
            </div>
          </div>
          <div class="col-auto mb-3">
            <!-- Bootstrap margin class: mb-3 for bottom margin -->
            <div class="btn shadow" id="resetButton">
              Reset
            </div>
          </div>
        </div>
        
          <div class="row">
          <div class="row justify-content-center">
          <div class="col-4 text-center">
          Country Names:
          <label class="switch">
            <input type="checkbox" id="country-name-checkbox" class="form-check-input">
            <span class="slider round"></span>
          </label>
        </div>
        <div class="col-4 text-center">
          Country Flags:
          <label class="switch">
            <input type="checkbox" id="country-flag-checkbox" class="form-check-input">
            <span class="slider round"></span>
          </label>
        </div>
        </div>


          <!-- ^^ Bootstrap Class -->
          <div class="row bg-light">
            <div class="col border" ><h1>Already Called:</h1><span id="alreadyCalled"></span></div>
            <div class="col border" ><h1>Current Call</h1><span id="currentCall"></span></div>
            <div class="col border" ><h1>Available List:</h1><span id="availableList"></span></div>
            <!-- ^^ Bootstrap Classes. ID's are selected in the index.js and given logic to them. -->
            </div>
          </div>
        </div>
      </div>
      <!-- Back button -->
      <div class="container text-end" id="back-btn-container">
        <div class="btn rounded shadow text-end mx-5 my-3 btn-lg" id="back-btn">
          Back
        </div>
      </div>
      `);
    // #availableList, #currentCall, #alreadyCalled
    //Dynamically Load navbar
    
    // loads the current set's flags into the available list of the call generator
    window.lobbySize = jsonData[index].countryCodes.length;
    function loadAvailableList() {
      countryCardsArray=[];
      currentCallArray=[];
      alreadyCalledArray=[];
      $("#availableList").empty();
      $("#currentCall").empty();
      $("#alreadyCalled").empty();
      for (let i = 0; i < jsonData[index].countryCodes.length; i++) {
        // ^^ This is how to get each individual country code for selection...


        // $(".availableList").append(jsonData[index].countryCodes[i]);
        let countryCode = jsonData[index].countryCodes[i]; // country code is used for the image source. EX: us.png == ${countryCode}.png
        let countryName = jsonData[index].countryName[i]; // countryName is used to display the country name on the page: EX: United States
        let countryImage = `<img class="img-fluid" src="flagImages/${countryCode}.png" alt=>`; // countryImage is used to display the country flag on the page: EX: <img src="imagesSmall/us.png"> displays US Flag
        let newCountryCard = $(
          `<div class='col-2-sm pt-3  mt-3 country-name' > ${countryName}</div><div class="col-2-sm pt-3 mt-3 country-flag">${countryImage}</div> <hr> `
        )
        
        countryCardsArray.push(newCountryCard);
        // console.log(countryCardsArray[i]);
        $.each(countryCardsArray, function(index, newCountryCard) {
          $("#availableList").append(newCountryCard);
        });
        
        $('#country-name-checkbox').prop('checked', true);
        $('#country-flag-checkbox').prop('checked', true);
      
        // Show all elements with the classes 'country-name' and 'country-flag' by default
        $('.country-name').show();
        $('.country-flag').show();

        $('#country-name-checkbox').on('change', function() {
          if ($(this).is(':checked')) {
            $('.country-name').show(); // Show all elements with the class 'country-name'
          } else {
            $('.country-name').hide(); // Hide them
          }
        });
      
        $('#country-flag-checkbox').on('change', function() {
          if ($(this).is(':checked')) {
            $('.country-flag').show(); // Show all elements with the class 'country-flag'
          } else {
            $('.country-flag').hide(); // Hide them
          }
        });
      }
      console.log("The size of " + lobbyName + " is: " + lobbySize);
    }
    loadAvailableList();
    let maxCalls = lobbySize;
    $("#callButton").on("click", function () {
      // Generate a random index based on the current count of maxCalls
      let randomIndex = Math.floor(Math.random() * maxCalls);
      // Retrieve and remove the randomly selected card from the array
      let randomCardSelected = countryCardsArray.splice(randomIndex, 1)[0];
      // Decrement maxCalls after removing the card from the array
      maxCalls--;
      // Check if the current call array is empty
      if (currentCallArray.length == 0) {
        currentCallArray.push(randomCardSelected);
        $("#currentCall").append(randomCardSelected);
      } else {
        let alreadyCalled = currentCallArray.pop();
        // Add the previously called card to the top of the already called list
        $("#alreadyCalled").prepend(alreadyCalled);
        // Add the new card to the current call
        currentCallArray.push(randomCardSelected);
        $("#currentCall").append(randomCardSelected);
      }
      // If all calls have been made, update the button text
      if (maxCalls === 0) {
        loadAvailableList();
      }
    });
    $("#resetButton").on("click", function () {
      loadAvailableList();
    });
    // Back button returns to the previous page
    $("#back-btn").on("click", function () {
      window.location.href = "index.html";
    });
 // End 'play game' function
}

// Use event delegation for button clicks
$("#saved-lobbies").on("click", ".delete-btn", function() {
  let index = $(this).data("lobby-name");
  deleteSet(index);
});

$("#saved-lobbies").on("click", ".printbtn", function() {
  let index = $(this).data("index");
  printSet(index);
});

$("#saved-lobbies").on("click", ".play-btn", function() {
  let index = $(this).data("index");
  playGame(index);
});

// Loop through jsonData and create the view
$.each(jsonData, function(index, value) {
  savedSetView(index, value.lobbyName);
});

// Function to delete an object from a cookie / Deletes your lobby from the cookie.
function deleteObjectFromCookie(cookieName, objectKey, keyValue) {
  let cookieValue = getCookie(cookieName);
  if (cookieValue) {
    let data = JSON.parse(cookieValue);
    console.log("Data:", data);
    // Assuming it's an array of objects as you described
    let updatedData = data.filter(obj => obj[objectKey] !== keyValue);
    console.log("Updated data:", updatedData);
    setCookie(cookieName, JSON.stringify(updatedData), 1000); // Set for 7 days, adjust as needed
  }
}

// Function to get cookie that we set earlier.
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

// Function to set an effectively permanent cookie.
function setCookie(name, value) {
  var expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 100);  // Setting expiry date to 100 years in the future
  document.cookie = name + "=" + encodeURIComponent(value) +
    "; expires=" + expiryDate.toUTCString() +
    "; path=/";
}

function generateBingoCard(numberOfFlags, numberOfCards) {
  let cards = [];
  for (let cardIndex = 0; cardIndex < numberOfCards; cardIndex++) {
    let cardNumbers = new Set();
    while (cardNumbers.size < 25) {
      let randomNumber = Math.floor(Math.random() * numberOfFlags);
      cardNumbers.add(randomNumber);
    }
    // Convert Set to Array and add to cards
    cards.push(Array.from(cardNumbers));
  }
  return cards;
}


function toggleForPrintPageSetUp(lobbyIndex) {
  let numberOfFlags = jsonData[lobbyIndex].countryCodes.length;
  let twoLetterCountryCode = jsonData[lobbyIndex].countryCodes;
  let countryName = jsonData[lobbyIndex].countryName;
  let lobbyName = jsonData[lobbyIndex].lobbyName;
  loadUpTogglePrintPage(twoLetterCountryCode , countryName, numberOfFlags,lobbyName);
}

function loadUpTogglePrintPage(twoLetterCountryCode, countryName, numberOfFlags, lobbyName) {
  $("body > :not(#navbar-placeholder)").remove();
  $("body").append(`
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-4 text-center">
          Country Names:
          <label class="switch">
            <input type="checkbox" id="country-name-checkbox" class="form-check-input">
            <span class="slider round"></span>
          </label>
        </div>
        <div class="col-4 text-center">
          Country Flags:
          <label class="switch">
            <input type="checkbox" id="country-flag-checkbox" class="form-check-input">
            <span class="slider round"></span>
          </label>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-4 text-center">
          PageCount: <input type="number" id="pageCount" min="1" value="1">
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-4 text-center">
          <button class="btn btn-primary" id="print-btn">Print Cards</button>      
        </div>
      </div>
    </div>
  `);
  
  // Initialize the switches to the "on" position if needed
  $('#country-name-checkbox').prop('checked', true);
  $('#country-flag-checkbox').prop('checked', true);
  
  // Add any additional JavaScript/jQuery logic for the switch functionality
  // ...



  $("#print-btn").on("click", function () {
    let pageCount = parseInt($("#pageCount").val(), 10);
    
    // Determine if country names should be included based on the switch
    let includedCountryNames = $("#country-name-checkbox").is(":checked") ? countryName : "";
    // Determine if country codes should be included based on the switch
    let includedCountryCodes = $("#country-flag-checkbox").is(":checked") ? twoLetterCountryCode : "";
  
    let rngCards = generateBingoCard(numberOfFlags, pageCount);
    try {
      printCards(includedCountryCodes, rngCards, includedCountryNames, pageCount, lobbyName);
      setTimeout(function () {
        location.reload();
      }, 501);
    }
    catch (error) {
      console.error("Error", error);
    }
  });
  
}

function printCards(twoLetterCountryCode, rngCards, countryName, pageCount, lobbyName) {
  let printWindow = window.open('', '_blank');
  printWindow.document.title = lobbyName;

  for (let i = 0; i < pageCount; i++) {
    let gridItems = '';
    for (let j = 0; j < 25; j++) {
      if (j === 12) {
        gridItems += '<div class="grid-item center-vertically">FREE<br><img src="../images/x.png"></div>\n';
      } else {
        let countryNameHtml = countryName ? `<p>${countryName[rngCards[i][j]]}</p>` : '';
        let flagImageHtml = twoLetterCountryCode ? `<img src="flagImages/${twoLetterCountryCode[rngCards[i][j]]}.png">` : '';
        gridItems += `<div class="grid-item center-vertically">${countryNameHtml}${flagImageHtml}</div>\n`;
      }
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>Lobby Name: ${lobbyName}</title>
          <link rel="stylesheet" href="./css/index.css" type="text/css" />
        </head>
        <body>
        <div class="print-container">
        <div class="grid-wrapper">
          <div class="grid-container">
            ${gridItems}
            </div>
          </div>
          </div>
        </body>
      </html>
    `);
  }

  setTimeout(function () { printWindow.print(); printWindow.close(); }, 500);
}

// Back button returns to the previous page
$("#back-btn").on("click", function () {
  window.location.href = "index.html";
});


