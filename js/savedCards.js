//Loads navbar.html into the navbar-placeholder div.
$(function () {
  $("#navbar-placeholder").load("navbar.html");
});

let jsonString = Cookies.get("lobbyData");
let jsonData = JSON.parse(jsonString);
let lobbyName;

/*
* The following function generates a row containing each card set and four buttons per each set:
* "Play", "Print", "Edit", "Delete"
*/
$(jsonData).each(function(index, value) {
  // jsonData == [{lobbyName: "Test", countryCodes: ["us", "ca"]}, {lobbyName: "Test2", countryCodes: ["us", "ca"]}];
  lobbyName= value.lobbyName;
  function savedSetView(){
    $("#saved-lobbies").append(`
    <div class="row border shadow m-3">
        <div class="col-3 my-auto">
            <h2>${lobbyName}</h2>
        </div>
        <div class="col-2 my-auto btn">
            <h1 id="${index}" ><i class="bi bi-dice-5"></i><span class="ps-2">Play</span></h1>
        </div>
        <button type="button" class="col-2 my-auto btn" data-bs-toggle="modal" data-bs-target="#staticPrintModal">
            <label for="pageCount"></label>
            <input type="number" id="pageCount" min="1" value="1">
            <h1 id="${lobbyName}" class="printbtn"></i><span class="ps-2">Print</span></h1>
        </button>
        <button type="button" class="col-2 my-auto btn">
            <h1 id="${lobbyName}" class="edit-btn"><i class="bi bi-pencil-square"></i><span class="ps-2">Edit</span></h1>
        </button>
        <button type="button" class="col-3 my-auto btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            <h1 id="${lobbyName}" class="delete-btn" data-index="${index}"><i class="bi bi-x-square"></i><span class="ps-2">Delete</span></h1>
        </button>
  `);
  }
  savedSetView();

  //Calling the modal once to create a DOM element for the modal, MUST BE DONE BEFORE CALLING MODAL
  $("#deleteModal").load("deleteSetModal.html");

  // The following function performs the deletion of a card set when the set's "Delete" button is pressed
  $(".delete-btn").on("click", function () {
    /* 
    * The lobbyName designated as the index, used for determining the set name to delete when passed
    * into the deleteObjectFromCookie() function
    */
    let index = $(this).attr("id");
    
    //Function that executes when the modal is loaded
    $("#deleteModal").load("deleteSetModal.html", function () {

      //Perform the try-catch block when the modal's "Yes" button is pressed
      $(document).on("click", "#modal-delete", function () {
        // Perform the deletion of the set from the browser's cookies
        try {
          deleteObjectFromCookie("lobbyData", "lobbyName", index);
          location.reload();
        } catch (error) {
          console.error("Error occurred while deleting from the cookie:", error);
        }
      });
    });     
  });

  $(".edit-btn").on("click", function(){
    let currentSetName = $(this).attr("id");
    //Injects the view for editing the card set's name, global function from index.js
    window.injectSaveSetView();
    /* 
    * if the submit button is clicked, update the set's from what was submitted in the form,
    * then save to cookies and update the view
    */
    $(document).on("click", "#submit", function(){
      // The input to the form is stored in a variable and will be passed as the new set name 
      let newSetName = $("#my-input").val();
  
      // Update the lobby name in the jsonData array
      jsonData.forEach((item) => {
          if (item.lobbyName === currentSetName) {
              item.lobbyName = newSetName;
          }
      });
  
      // Save the updated jsonData to the browser's cookies
      setCookie("lobbyData", JSON.stringify(jsonData));
  
      // Update the lobby name in the rendered page
      $(".row").each(function(index) {
          if ($(this).find("h2").text() === currentSetName) {
              $(this).find("h2").text(newSetName);
          }
      });
  
      // Re-render the view displaying all sets
      window.location.href = "savedCards.html";
    });
  });
 //Calling the modal once to create a DOM element for the modal, MUST BE DONE BEFORE CALLING MODAL
 $("#printmodal").load("printmodal.html");
 // The following function performs the deletion of a card set when the set's "Delete" button is pressed
 $(".printbtn").on("click", function(){

    let index = $(this).attr("id");
    console.log("Printing set: " + index);

    $("#printmodal").load("printmodal.html", function(){
      
        $(document).on("click", "#modal-print", function()
        {
          
          try
          {
            printPages();
            //location.reload();
          }
          catch(error)
          {
            console.error("Error",error);
          }
        });
    });
  });


  // The following function executes the 'play game' functionality when a set's "Play" button is pressed
  $(`#${index}`).on("click", function () {

    //This removes everything from the body except for the navbar.
    $("body > :not(nav)").remove();
      
      // This adds the "Call Generator" container to the body of the page
      $("body").append(`
      <div id="navbar-placeholder"></div>
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
      </div>
      <!-- Back button -->
      <div class="container text-end" id="back-btn-container">
        <div class="btn btn-primary rounded shadow text-end mx-5 my-3 btn-lg" id="back-btn">
          Back
        </div>
      </div>
      `);
      
    //Dynamically Load navbar
    $("#navbar-placeholder").load("navbar.html");
    // loads the current set's flags into the available list of the call generator
    function loadAvailableList(){
      for (let i = 0; i < jsonData[index].countryCodes.length; i++) {
        console.log("CURRENT CONSOLE LOG: " + jsonData[index].countryCodes[i] + jsonData[index]);
        // ^^ This is how to get each individual country code for selection...
        $(".availableList").append(jsonData[index].countryCodes[i]);
        let countryCode = jsonData[index].countryCodes[i]; // country code is used for the image source. EX: us.png == ${countryCode}.png
        let countryName = jsonData[index].countryName[i]; // countryName is used to display the country name on the page: EX: United States
        let countryImage = `<img class="img-fluid" src="flagImages/${countryCode}.png" alt=>`; // countryImage is used to display the country flag on the page: EX: <img src="imagesSmall/us.png"> displays US Flag
  
        let newCountryCard = $(
          `<div class='col-2-sm pt-3 border-top mt-3' id="${countryCode[i]}"> ${countryName} <br class ="hidden">${countryImage}</div>`
        )
        $("#availableList").append(newCountryCard);
      }
    }
    loadAvailableList();

    // Back button returns to the previous page
    $("#back-btn").on("click", function(){
      window.location.href = "index.html";
    });
    
  }); // End 'play game' function

}); // End OUTER jsonData function 


// Back button returns to the previous page
$("#back-btn").on("click", function(){
  window.location.href = "index.html";
});

function deleteObjectFromCookie(cookieName, objectKey, keyValue) {
  let cookieValue = getCookie(cookieName);
  if (cookieValue) {
      let data = JSON.parse(cookieValue);
      // Assuming it's an array of objects as you described
      let updatedData = data.filter(obj => obj[objectKey] !== keyValue);
      setCookie(cookieName, JSON.stringify(updatedData), 1000); // Set for 7 days, adjust as needed
  }
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

function setCookie(name, value) {
  var expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 100);  // Setting expiry date to 100 years in the future
  document.cookie = name + "=" + encodeURIComponent(value) +
    "; expires=" + expiryDate.toUTCString() +
    "; path=/";
}

function printPages() {

  let modalPath = "printmodal.html";
  
  $.get(modalPath, function(data){
    let parsedData = $(data);
    let pageCountID = parsedData.find('#pageCount');
    let pageCount = pageCountID.val();

    console.log("Number of cards to print: "+ pageCount);

  });
  
  /* var printWindow = window.open('', '_blank');

  for (var i = 0; i < pageCount; i++) {
    printWindow.document.write('<html><head>');
    printWindow.document.write('<link rel="stylesheet" href="./css/index.css" type="text/css" />');
    setTimeout(1000);
    printWindow.document.write('</head><body>');
    printWindow.document.write('<div class="bingo-grid"><div class="bingo-cell">1</div><div class="bingo-cell">2</div><div class="bingo-cell">3</div><div class="bingo-cell">4</div><div class="bingo-cell">5</div><div class="bingo-cell">6</div><div class="bingo-cell">7</div><div class="bingo-cell">8</div><div class="bingo-cell">9</div><div class="bingo-cell">10</div><div class="bingo-cell">11</div><div class="bingo-cell">12</div><div class="bingo-cell free-space">FREE</div><div class="bingo-cell">13</div><div class="bingo-cell">14</div><div class="bingo-cell">15</div><div class="bingo-cell">16</div><div class="bingo-cell">17</div><div class="bingo-cell">18</div><div class="bingo-cell">19</div><div class="bingo-cell">20</div><div class="bingo-cell">21</div><div class="bingo-cell">22</div><div class="bingo-cell">23</div><div class="bingo-cell">24</div></div>');
    printWindow.document.write('</body></html>');
    setTimeout(function(){mywindow.print();},1000);
  }
  setTimeout(function() {printWindow.print()},1000); */
};
  