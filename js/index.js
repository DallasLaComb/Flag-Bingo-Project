let countryData;
$.getJSON('js/countries.json', function(data) {
     countryData = data;

     // Initialize empty arrays for each continent
var naArray = [];
var euArray = [];
var afArray = [];
var asArray = [];
var ocArray = [];
var saArray = [];
// Traverse through the object
for (var country in countryData) {
    switch (countryData[country]) {
        case 'NA':
            naArray.push(country);
            break;
        case 'EU':
            euArray.push(country);
            break;
        case 'AF':
            afArray.push(country);
            break;
        case 'AS':
            asArray.push(country);
            break;
        case 'OC':
            ocArray.push(country);
            break;
        case 'SA':
            saArray.push(country);
            break;
    }
}
    for (let i = 0; i < countryData.length; i++) {
    let countryCode = countryData[i].countryCode.toLowerCase();
    let continent = countryData[i].continent;
    let countryName = countryData[i].countryName;
    let countryImage = `<img class="img-fluid" src="imagesSmall/${countryCode}.png">`;
    let newElement = $(`<div class='col-2-sm' id='${countryCode}'><hr>${countryName}<br>${countryImage}</div>`);
        newElement.on("click", function() {
         selectedFlagsOnClick.call(this);
    });
    switch (continent){
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

});

let selectedFlags = [];

function selectedFlagsOnClick(){
    if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        let index = selectedFlags.indexOf(this);
        if (index > -1) {
            selectedFlags.splice(index, 1);
        }
    } else {
        $(this).addClass("selected");
        selectedFlags.push(this);
        console.log(selectedFlags);
    }
    console.log(selectedFlags);
}


// CODE FROM ORIGINAL GROUP TO CALL RANDOM FLAGS FOR THE MOST PART UNCHANGED AS OF NOW....
//     $(".play-button").on("click",(function () {
//         $.each($(selectedFlags), function(i, field) {
//             var entry = <img className="img-fluid" src="./imagesSmall/`${countryCode}`.png">;
//             console.log(entry);
//             slotImages.push(entry);
//         });
//
//         // Loops through each element of slotImages and creates list of available countries for calling
//         $.each(slotImages, function (index) {
//             $(generateCardHTML(slotImages[index].src, slotImages[index].name)).appendTo("#available_img");
//         });
//
//         $("#country-selection").hide();
//         $("#bingo").show();
//     }));
//
//     // When clicked, call button should call a new, random country from the available list.
//     // If no countries remain, it should reset the game by reloading the page.
//     $("#call-button").click(function () {
//         // If no countries are left to be called, reload the page.
//         if(slotImages.length === 0){
//             location.reload();
//         }
//         // There are still countries left
//         else{
//             // Pick a random country from the remaining list
//             const callIndex = Math.floor(Math.random() * slotImages.length);
//             // Remove the selected country from the displayed available list
//             $("li#" + slotImages[callIndex].name.replaceAll(' ', '-')).remove();
//             // Update the current call listing
//             $("#flag-call").attr("src", slotImages[callIndex].src);
//             $("#flag-text").text(slotImages[callIndex].name);
//             // Add the current call to the previously called list
//             $(generateCardHTML(slotImages[callIndex].src, slotImages[callIndex].name)).prependTo("#previous_img");
//             // Remove current call from stored list of available calls
//             slotImages.splice(callIndex, 1);
//
//             // When no countries remain, update the button's text to reflect its new functionality
//             if(slotImages.length === 0){
//                 $("#call-button").text("Reset Game");
//             }
//         }
//     });
//
// // Generates the HTML string for the list item of each country in the available/previously called lists.
// // src: String of the image path for the flag
// // name: String of the name of the country
// function generateCardHTML(src, name){
//     return '<li id="' + name.replaceAll(' ','-') + '"><img src = "' + src + '" width="74px" height="44px" alt = ""><p>' + name + '</p></li>';
// }
