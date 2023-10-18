//Array of country images and their corresponding names
const slotImages = [];
const countries = [];

let checkAll = false;
let checkAllNA = false;
let checkAllCaribbean = false;
let checkAllSA = false;
let checkAllEurope = false;
let checkAllAfrica = false;
let checkAllAsia = false;
let checkAllAustralia = false;
let checkAllAntarctica = false;

$(document).ready(function () {
    $("#bingo").hide();
    $("#country-selection").show();

    $("#select-all").click(function () {
        if(checkAll === false){
            $("input").prop('checked', true);
            checkAll = true;
            checkAllNA = true;
            checkAllCaribbean = true;
            checkAllSA = true;
            checkAllEurope = true;
            checkAllAfrica = true;
            checkAllAsia = true;
            checkAllAustralia = true;
            checkAllAntarctica = true;
        }
        else{
            $("input").prop('checked', false);
            checkAll = false;
            checkAllNA = false;
            checkAllCaribbean = false;
            checkAllSA = false;
            checkAllEurope = false;
            checkAllAfrica = false;
            checkAllAsia = false;
            checkAllAustralia = false;
            checkAllAntarctica = false;
        }
    });

    $("#select-all-na").click(function () {
        if(checkAllNA === false){
            $("#select-north-america").find("input").prop('checked', true);
            checkAllNA = true;
        }
        else{
            $("#select-north-america").find("input").prop('checked', false);
            checkAllNA = false;
        }
    });

    $("#select-all-caribbean").click(function () {
        if(checkAllCaribbean === false){
            $("#select-caribbean").find("input").prop('checked', true);
            checkAllCaribbean = true;
        }
        else{
            $("#select-caribbean").find("input").prop('checked', false);
            checkAllCaribbean = false;
        }
    });

    $("#select-all-sa").click(function () {
        if(checkAllSA === false){
            $("#select-sa").find("input").prop('checked', true);
            checkAllSA = true;
        }
        else{
            $("#select-sa").find("input").prop('checked', false);
            checkAllSA = false;
        }
    });

    $("#select-all-europe").click(function () {
        if(checkAllEurope === false){
            $("#select-europe").find("input").prop('checked', true);
            checkAllEurope = true;
        }
        else{
            $("#select-europe").find("input").prop('checked', false);
            checkAllEurope = false;
        }
    });

    $("#select-all-africa").click(function () {
        if(checkAllAfrica === false){
            $("#select-africa").find("input").prop('checked', true);
            checkAllAfrica = true;
        }
        else{
            $("#select-africa").find("input").prop('checked', false);
            checkAllAfrica = false;
        }
    });

    $("#select-all-asia").click(function () {
        if(checkAllAsia === false){
            $("#select-asia").find("input").prop('checked', true);
            checkAllAsia = true;
        }
        else{
            $("#select-asia").find("input").prop('checked', false);
            checkAllAsia = false;
        }
    });

    $("#select-all-australia").click(function () {
        if(checkAllAustralia === false){
            $("#select-australia").find("input").prop('checked', true);
            checkAllAustralia = true;
        }
        else{
            $("#select-australia").find("input").prop('checked', false);
            checkAllAustralia = false;
        }
    });

    $("#select-all-antarctica").click(function () {
        if(checkAllAntarctica === false){
            $("#select-antarctica").find("input").prop('checked', true);
            checkAllAntarctica = true;
        }
        else{
            $("#select-antarctica").find("input").prop('checked', false);
            checkAllAntarctica = false;
        }
    });

    $("#submit").click(function () {
        console.log("submit pressed");
        $.each($("input:checked"), function(i, field) {
            var entry = {src: "Images/" + field.value + ".png", name: field.value};
            console.log(entry);
            slotImages.push(entry);
        });

        // Loops through each element of slotImages and creates list of available countries for calling
        $.each(slotImages, function (index) {
            $(generateCardHTML(slotImages[index].src, slotImages[index].name)).appendTo("#available_img");
        });

        $("#country-selection").hide();
        $("#bingo").show();
    });

    // When clicked, call button should call a new, random country from the available list.
    // If no countries remain, it should reset the game by reloading the page.
    $("#call-button").click(function () {
        // If no countries are left to be called, reload the page.
        if(slotImages.length === 0){
            location.reload();
        }
        // There are still countries left
        else{
            // Pick a random country from the remaining list
            const callIndex = Math.floor(Math.random() * slotImages.length);
            // Remove the selected country from the displayed available list
            $("li#" + slotImages[callIndex].name.replaceAll(' ', '-')).remove();
            // Update the current call listing
            $("#flag-call").attr("src", slotImages[callIndex].src);
            $("#flag-text").text(slotImages[callIndex].name);
            // Add the current call to the previously called list
            $(generateCardHTML(slotImages[callIndex].src, slotImages[callIndex].name)).prependTo("#previous_img");
            // Remove current call from stored list of available calls
            slotImages.splice(callIndex, 1);

            // When no countries remain, update the button's text to reflect its new functionality
            if(slotImages.length === 0){
                $("#call-button").text("Reset Game");
            }
        }
    });
});

// Generates the HTML string for the list item of each country in the available/previously called lists.
// src: String of the image path for the flag
// name: String of the name of the country
function generateCardHTML(src, name){
    return '<li id="' + name.replaceAll(' ','-') + '"><img src = "' + src + '" width="74px" height="44px" alt = ""><p>' + name + '</p></li>';
}

////Function to select all and deselect all inputs in the form
//function selects()
//{
//    const ele=document.getElementsByTagName('input');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=true;
//        }
//    }
//}
//
//function deSelect()
//{
//    const ele=document.getElementsByTagName('input');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=false;
//        }
//    }
//}
//
////Function to select all and deselect all North American Continents inputs in the form
//function selectsNA()
//{
//    const ele=document.getElementsByName('North America');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=true;
//        }
//    }
//}
//
//function deSelectNA()
//{
//    const ele=document.getElementsByName('North America');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=false;
//        }
//    }
//}
//
////Function to select all and deselect all South American inputs in the form
//function selectsSA()
//{
//    const ele=document.getElementsByName('South America');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=true;
//        }
//    }
//}
//
//function deSelectSA()
//{
//    const ele=document.getElementsByName('South America');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=false;
//        }
//    }
//}
//
////Function to select all and deselect all Caribbean inputs in the form
//function selectsC()
//{
//    const ele=document.getElementsByName('Caribbean');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=true;
//        }
//    }
//}
//
//function deSelectC()
//{
//    const ele=document.getElementsByName('Caribbean');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=false;
//        }
//    }
//}
//
////Function to select all and deselect all Europe inputs in the form
//function selectsE()
//{
//    const ele=document.getElementsByName('Europe');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=true;
//        }
//    }
//}
//
//function deSelectE()
//{
//    const ele=document.getElementsByName('Europe');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=false;
//        }
//    }
//}
//
////Function to select all and deselect all Africa inputs in the form
//function selectsA()
//{
//    const ele=document.getElementsByName('Africa');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=true;
//        }
//    }
//}
//
//function deSelectA()
//{
//    const ele=document.getElementsByName('Africa');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=false;
//        }
//    }
//}
//
////Function to select all and deselect all Asia inputs in the form
//function selectsAsia()
//{
//    const ele=document.getElementsByName('Asia');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=true;
//        }
//    }
//}
//
//function deSelectAsia()
//{
//    const ele=document.getElementsByName('Asia');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=false;
//        }
//    }
//}
//
////Function to select all and deselect all Australia inputs in the form
//function selectsAus()
//{
//    const ele=document.getElementsByName('Australia');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=true;
//        }
//    }
//}
//
//function deSelectAus()
//{
//    const ele=document.getElementsByName('Australia');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=false;
//        }
//    }
//}
//
////Function to select all and deselect all Antarctica inputs in the form
//function selectsAnt()
//{
//    const ele=document.getElementsByName('Antarctica');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=true;
//        }
//    }
//}
//
//function deSelectAnt()
//{
//    const ele=document.getElementsByName('Antarctica');
//    for(let i=0; i<ele.length; i++)
//    {
//        if(ele[i].type==='checkbox')
//        {
//            ele[i].checked=false;
//        }
//    }
//}