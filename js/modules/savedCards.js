$(document).ready(function() {
  editSet();
  printSet();
});
let maxCalls = 0;
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
    <div class="container border shadow bg-light p-3">
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
          Number of cards you want to print: <input type="number" id="pageCount" min="1" value="1">
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


