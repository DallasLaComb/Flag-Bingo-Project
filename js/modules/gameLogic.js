import { setCookie, getCookie } from './cookieManager.js';

export function playGame(index) {
    console.log("Play game called");
    removeElementsFromBody();
    addCallGeneratorContainer();
    addButtonsAndToggles();
    addCallGeneratorContainers();
    loadNavbar();
}

function removeElementsFromBody() {
    $("body > :not(#navbar-placeholder)").remove();
}

function addCallGeneratorContainer() {
    $("body").append(`
        <div class="container mt-4 border shadow bg-light p-3">
            <!-- This row is just for the toggles, centered -->
            <div class="row justify-content-center">
                <!-- Toggle for Country Names -->
                <div class="col-auto text-center">
                    Country Names:
                    <label class="switch">
                        <input type="checkbox" id="country-name-checkbox" class="form-check-input">
                        <span class="slider round"></span>
                    </label>
                </div>
                <!-- Toggle for Country Flags -->
                <div class="col-auto text-center">
                    Country Flags:
                    <label class="switch">
                        <input type="checkbox" id="country-flag-checkbox" class="form-check-input">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
    
            <!-- This row is for the buttons and toggles -->
            <div class="row justify-content-center">
                <!-- This column is for the buttons, centered -->
                <div class="col-auto text-center mt-3">
                    <!-- Call button with margin to the right -->
                    <div class="btn shadow me-3" id="callButton">Call</div>
                    <!-- Reset button -->
                    <div class="btn shadow" id="resetButton">Reset</div>
                </div>
            </div>
        </div>
    `);
}

function addButtonsAndToggles() {
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

function addCallGeneratorContainers() {
    $("body").append(`
        <div class="container mt-1">
            <div class="row border shadow bg-light">
                <div class="col border" ><h1>Already Called:</h1><span id="alreadyCalled"></span></div>
                <div class="col border" ><h1>Current Call</h1><span id="currentCall"></span></div>
                <div class="col border" ><h1>Available List:</h1><span id="availableList"></span></div>
            </div>
        </div>
    `);
}

function loadNavbar() {
    // Dynamically Load navbar
}

export function generateBingoCard(numberOfFlags, numberOfCards) {
    // Implementation
}

function loadAvailableList() {
    let lobbySize = jsonData[index].countryCodes.length;
    maxCalls = lobbySize;
    countryCardsArray=[];
    currentCallArray=[];
    alreadyCalledArray=[];
    $("#availableList").empty();
    $("#currentCall").empty();
    $("#alreadyCalled").empty();
    for (let i = 0; i < jsonData[index].countryCodes.length; i++) {
        let countryCode = jsonData[index].countryCodes[i];
        let countryName = jsonData[index].countryName[i];
        let countryImage = `<img class="img-fluid" src="flagImages/${countryCode}.png" alt=>`;
        let newCountryCard = $(
            `<div class='col-2-sm pt-3  mt-3 country-name' > ${countryName}</div><div class="col-2-sm pt-3 mt-3 country-flag">${countryImage}</div> <hr> `
        )
        countryCardsArray.push(newCountryCard);
        $.each(countryCardsArray, function(index, newCountryCard) {
            $("#availableList").append(newCountryCard);
        });
        $('#country-name-checkbox').prop('checked', true);
        $('#country-flag-checkbox').prop('checked', true);
        $('.country-name').show();
        $('.country-flag').show();
        $('#country-name-checkbox').on('change', function() {
            if ($(this).is(':checked')) {
                $('.country-name').show();
            } else {
                $('.country-name').hide();
            }
        });
        $('#country-flag-checkbox').on('change', function() {
            if ($(this).is(':checked')) {
                $('.country-flag').show();
            } else {
                $('.country-flag').hide();
            }
        });
    }
    console.log("The size of " + lobbyName + " is: " + lobbySize);
}
function callButtonClicked() {
    let randomIndex = Math.floor(Math.random() * maxCalls);
    let randomCardSelected = countryCardsArray.splice(randomIndex, 1)[0];
    maxCalls--;
    if (currentCallArray.length == 0) {
        currentCallArray.push(randomCardSelected);
        $("#currentCall").append(randomCardSelected);
    } else {
        let alreadyCalled = currentCallArray.pop();
        $("#alreadyCalled").prepend(alreadyCalled);
        currentCallArray.push(randomCardSelected);
        $("#currentCall").append(randomCardSelected);
    }
    if (maxCalls === 0) {
        loadAvailableList();
    }
}
function resetButtonClicked() {
    loadAvailableList();
}
function backButtonClicked() {
    window.location.href = "index.html";
}
loadAvailableList();
$("#callButton").on("click", callButtonClicked);
$("#resetButton").on("click", resetButtonClicked);
$("#back-btn").on("click", backButtonClicked);
      function loadAvailableList() {
        let lobbySize = jsonData[index].countryCodes.length;
        maxCalls = lobbySize;
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


