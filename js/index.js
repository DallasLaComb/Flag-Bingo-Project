let countryData;
$.getJSON('js/countries.json', function(data) {
     countryData = data;
     // console.log(countryData);
     
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
    let countryCode = countryData[i].countryCode;
    let continent = countryData[i].continent;
    let countryName = countryData[i].countryName;
    let countryImage = `<img class="img-fluid" src="./imagesSmall/${countryCode}.png">`;

    console.log(continent);
    switch (continent){
        case "NA":
            $(".na").append("<div class=col-2-sm><hr>"+countryName+"<br> "+countryImage+"</div>")
            break;
        case "EU":
            $(".eu").append("<div class=col-2-sm><hr>"+countryName+"<br> "+countryImage+"</div>")
            break;
        case "AS":
            $(".as").append("<div class=col-2-sm><hr>"+countryName+"<br> "+countryImage+"</div>")
            break;
        case "AF":
            $(".af").append("<div class=col-2-sm><hr>"+countryName+"<br> "+countryImage+"</div>")
            break;
        case "SA":
            $(".sa").append("<div class=col-2-sm><hr>"+countryName+"<br> "+countryImage+"</div>")
            break;
        case "OC":
            $(".au").append("<div class=col-2-sm><hr>"+countryName+"<br> "+countryImage+"</div>")
            break;
    }
    }


     
     
     
});






// Now `naArray` contains all the 'NA' countries, `euArray` contains all the 'EU' countries, and so on.
// console.log('North America:', naArray);
// console.log('Europe:', euArray);
// console.log('Africa:', afArray);
// console.log('Asia:', asArray);
// console.log('Oceania:', ocArray);
// console.log('South America:', saArray);
// console.log(Object.keys(data).length);

// ... and so on for other continents
