$(function () {
  $("#navbar-placeholder").load("navbar.html");
});
// ^^ Loads navbar.html into the navbar-placeholder div.
let jsonString = Cookies.get("lobbyData");
console.log(jsonString);
let jsonData = JSON.parse(jsonString);
let lobbyName;
// jsonData == [{lobbyName: "Test", countryCodes: ["us", "ca"]}, {lobbyName: "Test2", countryCodes: ["us", "ca"]}];
$(jsonData).each(function (index, value) {
  lobbyName= value.lobbyName;
  console.log(lobbyName);
  $("#saved-lobbies").append(`
    <div class="row border shadow m-3">
        <div class="col-3 my-auto">
            <h2>${lobbyName}</h2>
        </div>
        <div class="col-2 my-auto btn">
            <h1 id="${index}" ><i class="bi bi-dice-5"></i><span class="ps-2">Play</span></h1>
        </div>
        <div class="col-2 my-auto btn">
            <label for="pageCount"></label>
            <input type="number" id="pageCount" min="1" value="1">
            <h1><id="${lobbyName}" class="printbtn"></i><span class="ps-2">Print</span></h1>
        </div>
        <div class="col-2 my-auto btn">
            <h1><i class="bi bi-pencil-square"></i><span class="ps-2">Edit</span></h1>
        </div>
        <div class="col-3 my-auto btn">
            <h1 id="${lobbyName}" class="delete-btn" data-index="${index}"><i class="bi bi-x-square"></i><span class="ps-2">Delete</span></h1>
        </div>
  `);

$(".delete-btn").on("click", function () {
  // console.log("delete button clicked: " + $(this).attr("id"));
  let index = $(this).attr("index");
  console.log("delete button clicked for index: " + index);
  deleteObjectFromCookie("lobbyData", "lobbyName", $(this).attr("id"));
  location.reload();
});
$(".printbtn").on("click", function () {
  let index = $(this).attr("index");
  console.log("print btn clicked for index: " + index);
  printPages();


});

  console.log(index, value);
  // console.log(jsonData[index].countryCodes[o]);
  $(`#${index}`).on("click", function () {
    $("body > :not(nav)").remove();
// ^^ This removes everything from the body except for the navbar.
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




    // This adds the "Call Generator" page to the body of the page.
    // ^^ Already called, current call, and available list...
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

  });
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
  var pageCount = parseInt(document.getElementById('pageCount').value);
  var printWindow = window.open('', '_blank');

  for (var i = 0; i < pageCount; i++) {
    printWindow.document.write('<html><head>');
    printWindow.document.write('<link rel="stylesheet" href="./css/index.css" type="text/css" />');
    setTimeout(1000);
    printWindow.document.write('</head><body>');
    printWindow.document.write('<div class="bingo-grid"><div class="bingo-cell">1</div><div class="bingo-cell">2</div><div class="bingo-cell">3</div><div class="bingo-cell">4</div><div class="bingo-cell">5</div><div class="bingo-cell">6</div><div class="bingo-cell">7</div><div class="bingo-cell">8</div><div class="bingo-cell">9</div><div class="bingo-cell">10</div><div class="bingo-cell">11</div><div class="bingo-cell">12</div><div class="bingo-cell free-space">FREE</div><div class="bingo-cell">13</div><div class="bingo-cell">14</div><div class="bingo-cell">15</div><div class="bingo-cell">16</div><div class="bingo-cell">17</div><div class="bingo-cell">18</div><div class="bingo-cell">19</div><div class="bingo-cell">20</div><div class="bingo-cell">21</div><div class="bingo-cell">22</div><div class="bingo-cell">23</div><div class="bingo-cell">24</div></div>');
    printWindow.document.write('</body></html>');
    setTimeout(function(){mywindow.print();},1000);
  }
  setTimeout(function() {printWindow.print()},1000);
}

