// This is for testing git commit messages...
$(document).ready(function() {
  editSet();
  printSet();
});

let countryCardsArray = []; //Global variable for call generator
let currentCallArray = []; //Global variable for call generator
let alreadyCalledArray = []; //Global variable for call generator
//Loads navbar.html into the navbar-placeholder div.
$(function () {
  $("#navbar-placeholder").load("navbar.html");
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
    $(function () {
      $("#navbar-placeholder").load("navbar.html");
    });
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
  $("body > :not(nav)").remove();
    // This adds the "Call Generator" container to the body of the page
    $("body").append(`
      <div id="navbar-placeholder"></div>
      <div class="container" id="callGenerator">
          <!-- ^^ Container = Bootstrap. | callGenerator id is used as a selector in index.js. | It is selected to take off class deactivate, which is a class made in index.css to hide elements from user. This gives the appearance of multiple screens even though it's just one. -->
        <div class="row">
        <!-- ^^ Bootstrap Class -->
          <div class="btn shadow mx-auto col-2 mb-3" id="callButton">
          <!-- ^^ Bootstrap Class. ID Call button will be used as a selector in index.js...Will have oncClick then do this logic to it... -->
            Call
          </div>
          <div class="row">
          <!-- ^^ Bootstrap Class -->
            <div class="col border" ><h1>Already Called:</h1><span id="alreadyCalled"></span></div>
            <div class="col border" id="currentCall"><h1>Current Call</h1></div>
            <div class="col border" id="availableList"><h1>Available List:</h1></div>
            <!-- ^^ Bootstrap Classes. ID's are selected in the index.js and given logic to them. -->
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
    $("#navbar-placeholder").load("navbar.html");
    // loads the current set's flags into the available list of the call generator
    window.lobbySize = jsonData[index].countryCodes.length;
    function loadAvailableList() {
      for (let i = 0; i < jsonData[index].countryCodes.length; i++) {
        // ^^ This is how to get each individual country code for selection...
        $(".availableList").append(jsonData[index].countryCodes[i]);
        let countryCode = jsonData[index].countryCodes[i]; // country code is used for the image source. EX: us.png == ${countryCode}.png
        let countryName = jsonData[index].countryName[i]; // countryName is used to display the country name on the page: EX: United States
        let countryImage = `<img class="img-fluid" src="flagImages/${countryCode}.png" alt=>`; // countryImage is used to display the country flag on the page: EX: <img src="imagesSmall/us.png"> displays US Flag
        let newCountryCard = $(
          `<div class='col-2-sm pt-3 border-top mt-3' id="${countryCode[i]}"> ${countryName} <br class ="hidden">${countryImage}</div>`
        )
        countryCardsArray.push(newCountryCard);
        // console.log(countryCardsArray[i]);
        $("#availableList").append(newCountryCard);
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
        $("#callButton").text("Reset Game");
      }
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
  loadUpTogglePrintPage(twoLetterCountryCode , countryName, numberOfFlags);
}

function loadUpTogglePrintPage(twoLetterCountryCode, countryName , numberOfFlags){
  $("body > :not(#navbar-placeholder)").remove();
  $("body").append(`
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-4 text-center">
        Country Names: <input type="checkbox" class="form-check-input">
      </div>
      <div class="col-4 text-center">
        Country Flags: <input type="checkbox" class="form-check-input">
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-4 text-center">
        PageCount: <input type="number" id="pageCount" min="1" value="pageCount">
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-4 text-center">
      <button class="btn btn-primary" id="print-btn">Print Cards</button>      
      </div>
    </div>
  </div>
`);
$("#print-btn").on("click", function () {
  let pageCount = parseInt($("#pageCount").val(), 10);
  let rngCards = generateBingoCard(numberOfFlags, pageCount);
  try {
    printCards(twoLetterCountryCode, rngCards, countryName, pageCount);
    setTimeout(function () {
      location.reload();
    }, 501);
  }
  catch (error) {
    console.error("Error", error);
  }
});
}

function printCards(twoLetterCountryCode, rngCards, countryName, pageCount) {
  let printWindow = window.open('', '_blank');
  for (let i = 0; i < pageCount; i++) {
    let gridItems = '';
    for (let j = 0; j < 25; j++) {
      if (j === 12) {
        gridItems += '<div class="grid-item">FREE</div>\n';
      } else {
        gridItems += `<div class="grid-item"><p>${countryName[rngCards[i][j]]}</p><img src="flagImages/${twoLetterCountryCode[rngCards[i][j]]}.png"></div>\n`;
      }
    }
    printWindow.document.write(`
      <html>
        <head>
          <link rel="stylesheet" href="./css/index.css" type="text/css" />
        </head>
        <body>
          <div class="grid-container">
            ${gridItems}
          </div>
        </body>
      </html>
    `);
  }

  setTimeout(function () { printWindow.print() }, 500);
}

// Back button returns to the previous page
$("#back-btn").on("click", function () {
  window.location.href = "index.html";
});

