if (localStorage.getItem("loggedInUser") === null) {
        window.location.href = "index.html";
}

$(document).ready(function() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            console.log(xmlHttp.responseText);
            if (xmlHttp.responseText === "false") {
                window.location.href = "index.html";
            }
        }
    }
    xmlHttp.open("POST", "https://shielded-bayou-99151.herokuapp.com/is_staff_logged_in?u=" + localStorage.getItem("loggedInUser"), true);
    xmlHttp.send();


    document.getElementById("active-user").innerHTML = localStorage.getItem("loggedInUser");

    $('#confirmation').on('hidden.bs.modal', function () {
        document.getElementById("sorry").style.visibility = "hidden";
        document.getElementById("delete").disabled = false;
        isErrorShownAlready = false;
    });

    $('#sidebar-logout').click(function () {
        console.log("logout called");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                localStorage.removeItem("loggedInUser");
                window.location.href = "index.html";
            }
        }
        xmlHttp.open("POST", "https://shielded-bayou-99151.herokuapp.com/staff_logout?u=" + localStorage.getItem("loggedInUser"), true);
        xmlHttp.send();
    });
});

var currentJSON;
var confirmMessage;
var isErrorShownAlready = false;

function getDatabase() {
    var button = document.getElementById("getDB");
    button.disabled = true;
    button.innerHTML = '<span class="fas fa-sync fa-spin"></span> ' + button.innerHTML;
    var oldTbody = document.getElementById("tablecontent");
    var newTbody = document.createElement("tbody");
    newTbody.id = "hold";
    oldTbody.parentNode.replaceChild(newTbody, oldTbody);
    document.getElementById("hold").id = "tablecontent";
    try {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200) {
            var data = xmlHttp.responseText;
            var parsed = JSON.parse(data);
            currentJSON = parsed;

            for (var i = 0; i < parsed.length; i++) {

                var username = parsed[i][0];
                var password = parsed[i][1];
                var nric = parsed[i][2].encrypted_id;
                var name = parsed[i][2].name;
                var dob = parsed[i][2].birthdate;
                var postcode = parsed[i][2].postcode;
                createTableRow(i, nric, name, dob, postcode);
            }
            button.removeChild(button.getElementsByTagName("span")[0]);
            document.getElementById("getDB").disabled = false;

            } else if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status !== 200) {
                button.removeChild(button.getElementsByTagName("span")[0]);
                document.getElementById("getDB").disabled = false;
            }
        }
        var authorizationBasic = btoa(localStorage.getItem("loggedInUser") + ':' + localStorage.getItem("loggedInPW"));
        xmlHttp.open("GET", "https://shielded-bayou-99151.herokuapp.com/get_company_database", true);
        xmlHttp.setRequestHeader('Authorization', 'Basic ' + authorizationBasic);
        xmlHttp.send();
    } catch (err) {
        alert(err); 
    }
}

function createTableRow(i, nric, name, dob, postcode) {
    var row = document.createElement("TR");
    var nric_col = document.createElement("TD");
    var name_col = document.createElement("TD");
    var dob_col = document.createElement("TD");
    var postcode_col = document.createElement("TD");
    var del_col = document.createElement("TD")
    nric_col.setAttribute("class", "cell100 column1");
    name_col.setAttribute("class", "cell100 column2");
    dob_col.setAttribute("class", "cell100 column3");
    postcode_col.setAttribute("class", "cell100 column4");
    del_col.setAttribute("class", "cell100 column5")
    row.setAttribute("class", "row100 body");
    nric_col.innerHTML = nric;
    name_col.innerHTML = name;
    dob_col.innerHTML = dob;
    postcode_col.innerHTML = postcode;
    del_col.innerHTML = '<a class="times" href="#confirmation" id="trash'+ i +'"onmouseout="mouseLeaveDeleteButton(this)" onmouseover="mouseOverDeleteButton(this)" onclick="confirmDelete(this)" data-toggle="modal"><span class="fas fa-times fa-lg"></span></a>';
    row.appendChild(nric_col);
    row.appendChild(name_col);
    row.appendChild(dob_col);
    row.appendChild(postcode_col);
    row.appendChild(del_col);
    document.getElementById("tablecontent").appendChild(row);
}

function confirmDelete(link) {
    var index = link.id.slice(5);
    var username = currentJSON[index][0];
    var name = currentJSON[index][2].name;
    var nric = currentJSON[index][2].encrypted_id;
    confirmMessage = 'Are you sure you want to delete user <font style="color: #c70c0c;">'+ username + '</font>: ' + name + ', '  + nric + '? This action cannot be reversed.';
    console.log("deleting user with username: "+ username);
    document.getElementById("confirmation-message").innerHTML = confirmMessage;
    document.getElementById("delete").innerHTML = "Delete " + username;
}

// precondition: username has NO spaces
function deleteUser(delButton) {
    var username = delButton.innerHTML.split(" ")[1];
    delButton.disabled = true;
    document.getElementById("cancel-delete").disabled = true;
    document.getElementById("x-delete").disabled = true;
    delButton.innerHTML = '<span class="fas fa-sync fa-spin"></span> ' + delButton.innerHTML;
    setTimeout(function() {
    var xmlHttp = new XMLHttpRequest();
        try {
            // i got a response.
            xmlHttp.onreadystatechange = function() {
                try {
                    var spinner = delButton.getElementsByTagName("span")[0];
                    spinner.parentNode.removeChild(spinner);
                } catch (err) {}
                // response is bad, if error not shown, show error
                if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status !== 200) {
                    if (!isErrorShownAlready) {
                        document.getElementById("sorry").style.visibility = "visible";
                        isErrorShownAlready = true;
                    }
                    delButton.disabled = false;
                }
                // response is good
                if (xmlHttp.readyState === XMLHttpRequest.DONE && xmlHttp.status === 200) {
                    isErrorShownAlready = false;
                    $('#confirmation').modal('hide');
                    getDatabase();
                } 
                document.getElementById("cancel-delete").disabled = false;
                document.getElementById("x-delete").disabled = false;
            }
            xmlHttp.open("POST", "https://shielded-bayou-99151.herokuapp.com/company_del_user?username=" + username, true);
            xmlHttp.send();
        } catch (err) {
            alert(err); 
        }
    }, 1000);
}