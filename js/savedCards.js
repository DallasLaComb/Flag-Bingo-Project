// // Creating saved cards tab. When you click on the saved cards tab, it will display the saved cards via cookies...
    // ADD ANYTHING FOR SAVED CARDS TAB BELOW THIS LINE
    let jsonString = Cookies.get("myCookie");
    let retrievedCookies = JSON.parse(jsonString);
    console.log("Cookie Dump: " + retrievedCookies);
    $("body").append(retrievedCookies);

  