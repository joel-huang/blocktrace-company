function getDatabase() {

    // clear the table
    var oldTbody = document.getElementById("tablecontent");
    var newTbody = document.createElement("tbody");
    newTbody.id = "hold";
    oldTbody.parentNode.replaceChild(newTbody, oldTbody);
    document.getElementById("hold").id = "tablecontent";

    try {
        var xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange = function() { 

            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {


                    var data = xmlHttp.responseText;
                    var parsed = JSON.parse(data);

                    for (var entry in parsed) {

                        var row = document.createElement("TR");
                        var request_col = document.createElement("TD");
                        var priv_key_col = document.createElement("TD");
                        var pub_key_col = document.createElement("TD");
                        
                        request_col.setAttribute("class", "cell100 column1");
                        priv_key_col.setAttribute("class", "cell100 column2 long");
                        pub_key_col.setAttribute("class", "cell100 column3 long");
                        row.setAttribute("class", "row100 body");

                        request_col.innerHTML = entry;
                        priv_key_col.innerHTML = parsed[entry].private_key.slice(48);
                        pub_key_col.innerHTML = parsed[entry].public_key.slice(71);

                        row.appendChild(request_col);
                        row.appendChild(priv_key_col);
                        row.appendChild(pub_key_col);
                        document.getElementById("tablecontent").appendChild(row);
                    }
            }
        }
        xmlHttp.open("GET", "https://shielded-bayou-99151.herokuapp.com/get_database", true);
        xmlHttp.send();
    } catch (err) {
        alert(err); 
    }
}