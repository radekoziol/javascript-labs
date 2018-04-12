
var map = {};

function myfunc() {

    map[document.getElementById("vh").value] = document.getElementById("vh1").value;

    var output = "";

    Object.keys(map).forEach(function(key) {
        output += key + " - " +  map[key] + "<br>"
    });

    document.getElementById("output").innerHTML = output;

}