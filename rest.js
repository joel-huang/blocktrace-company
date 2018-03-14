function getDatabase() {
    try {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var data = xmlHttp.responseText;
                var parsed = JSON.parse(data);

                for (var entry in parsed) {

                    var row = document.createElement("TR");
                    var request_col = document.createElement("TD");
                    var key_col = document.createElement("TD");
                    
                    request_col.setAttribute("class", "cell100 column1");
                    key_col.setAttribute("class", "cell100 column2");
                    row.setAttribute("class", "row100 body");

                    request_col.innerHTML = entry;
                    key_col.innerHTML = parsed[entry].public_key;

                    row.appendChild(request_col);
                    row.appendChild(key_col);
                    document.getElementById("tablecontent").appendChild(row);
                }


            
                // var usertransform =  {'<>':'td class="cell100 column1"','html':'${111}'};
                // var userdata = json2html.transform(data, usertransform);

                // var keytransform =  {'<>':'td class="cell100 column2"','html':'${}'};
                // var tbldata = json2html.transform(data, keytransform);

                // console.log(userdata);
                // console.log(tbldata);


                // var row = document.createElement("TR");
                // row.setAttribute("class", "row100 body");
                // row.innerHTML = userdata + tbldata;
                // document.getElementById("tablecontent").appendChild(row);
            }
        }

        xmlHttp.open("GET", "https://shielded-bayou-99151.herokuapp.com/getDatabase", true); // true for asynchronous 
        xmlHttp.send();
    } catch (err) {
        alert(err); 
    }
}

