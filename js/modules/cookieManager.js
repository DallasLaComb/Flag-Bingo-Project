// cookieManager.js
export function setCookie(name, value) {
    var expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 100);  // Setting expiry date to 100 years in the future
    document.cookie = name + "=" + encodeURIComponent(value) +
        "; expires=" + expiryDate.toUTCString() +
        "; path=/";
}

export function getCookie(name) {
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

export function deleteObjectFromCookie(cookieName, objectKey, keyValue) {
    let cookieValue = getCookie(cookieName);
    if (cookieValue) {
        let data = JSON.parse(cookieValue);
        console.log("Data:", data);
        // Assuming it's an array of objects as you described
        let updatedData = data.filter(obj => obj[objectKey] !== keyValue);
        console.log("Updated data:", updatedData);
        setCookie(cookieName, JSON.stringify(updatedData), 1000); // Set for 7 days, adjust as needed
    }
}
