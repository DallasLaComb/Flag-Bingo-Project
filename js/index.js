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
    let newElement = $(`<div class='col-2-sm pt-3 border-top mt-3' id='${countryCode}'>${countryName}<br class ="hidden">${countryImage}<i class="bi bi-app "></i></div>`);
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
        $(this).children().removeClass("bi-check-square");
        let index = selectedFlags.indexOf(this);
        if (index > -1) {
            selectedFlags.splice(index, 1);
        }
    } else {
        $(this).children().addClass("bi-check-square");

        $(this).addClass("selected");
        selectedFlags.push(this);
    }
}

//WHEN PLAY IS CLICKED LOAD THE CALL GENERATOR STUFF
// LOGIC WILL CHANGE SLIGHTLY BELOW AFTER DOING THE COOKIES I THINK
$(".play-button").on("click", function(){
    $("i").remove();
    $(".callGenerator").removeClass("deactivate");
    $(".play-button").addClass("deactivate");
    $(".flagSelectionContainer").addClass("deactivate");
    $(".availableList").append(selectedFlags);
    console.log(selectedFlags);
})
