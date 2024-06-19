function validateLoginForm() {
    var username = document.forms["loginForm"]["username"].value;
    var password = document.forms["loginForm"]["password"].value;
    var role = document.forms["loginForm"]["role"].value;
    if (username == "" || password == "" || role == "") {
        alert("Username and Password must be filled out");
        return false;
    }
    return true;
}
