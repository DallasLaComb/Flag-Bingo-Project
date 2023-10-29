// // Creating saved cards tab. When you click on the saved cards tab, it will display the saved cards via cookies...
    // ADD ANYTHING FOR SAVED CARDS TAB BELOW THIS LINE
    let jsonString = Cookies.get("lobbyData");
    let retrievedCookies = JSON.parse(jsonString);
    for (let i=0; i<retrievedCookies.length; i++) {
        let lobbyName = retrievedCookies[i].lobbyName;
        $("body").append(lobbyName);
    }
    console.log("Cookie Dump: " + jsonString);
  

  