// // Creating saved cards tab. When you click on the saved cards tab, it will display the saved cards via cookies...
// ADD ANYTHING FOR SAVED CARDS TAB BELOW THIS LINE
// let retrievedCookies = JSON.parse(jsonString);
// for (let i=0; i<retrievedCookies.length; i++) {
//     let lobbyName = retrievedCookies[i].lobbyName;
//     $("body").append(lobbyName);
// }
// console.log("Cookie Dump: " + jsonString);

let jsonString = Cookies.get("lobbyData");

let jsonData = JSON.parse(jsonString);
$(jsonData).each(function (index, value) {
  let lobbyName = value.lobbyName;
  console.log(lobbyName);
  $("#saved-lobbies").append(`
    <div class="row border shadow m-3">
        <div class="col-3 my-auto">
            <h2>${lobbyName}</h2>
        </div>
        <div class="col-2 my-auto btn">
            <h1><i class="bi bi-dice-5 "></i><span class="ps-2">Play</span></h1>
        </div>
        <div class="col-2 my-auto btn">
            <h1><i class="bi bi-printer"></i><span class="ps-2">Print</span></h1>
        </div>
        <div class="col-2 my-auto btn">
            <h1><i class="bi bi-pencil-square"></i><span class="ps-2">Edit</span></h2>
        </div>
        <div class="col-3 my-auto btn">
            <h1><i class="bi bi-x-square-fill"></i><span class="ps-2">Delete</span></h2>
        </div>
  `);
});

//
