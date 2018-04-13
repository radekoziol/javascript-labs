var map = {};


function update() {
    addNewTranslation();
    printResults();
    printChart()
}

function countValues(val) {
    return (String(val).match(/,/g) || []).length;
}

function addNewTranslation() {

    var key = document.getElementById("vh").value;
    var val = document.getElementById("vh1").value;

    if (map[key] === undefined)
        map[key] = [];
    // Duplicates
    if (map[key].toString().split(",")
            .every(function (value) {
                return value !== val
            })){
        if(val !== undefined)
            map[key].push(val);
    }
}

function printResults() {
    var output = "";
    var c = 0;
    Object.keys(map).forEach(function (key) {
        c += map[key].toString().length;
        if (c > 20){
            output += key + " - " + map[key].toString().substring(0, 50) + "..   translation number: "
                + (countValues(map[key]) + 1) + "<br>";
            return void(0);
        }
        else
            output += key + " - " + map[key] + "   translation number: "
                + (countValues(map[key]) + 1) + "<br>";
    });

    document.getElementById("output").innerHTML = output;
}

function printChart() {

    var c = 1;
    Object.keys(map).forEach(function (key) {


        for (var i = 0; i <= 25; i++) {
            var can = document.getElementById("chart");
            var ctx = can.getContext("2d");
            ctx.fillStyle = "darkslategrey";
            ctx.font = "10px Arial";
            ctx.fillText(i.toString(), (i + 1) * 20, 15, 15);
        }


        for (i = 1; i <= countValues(map[key]) + 1; i++) {
            can = document.getElementById("chart");
            ctx = can.getContext("2d");
            ctx.fillStyle = "lightseagreen";
            ctx.fillRect(i * 20, c * 20, 25, 20);
            if(i >= 10){
                ctx.fillStyle = "darkslategrey";
                ctx.font = "12px Arial";
                ctx.fillText(">10", (i + 1) * 20 - 10, c*20 + 10, 20);
                break;
            }
        }

        ctx.fillStyle = "darkslategrey";
        ctx.font = "15px Arial";
        if (key.toString().length > 25)
            ctx.fillText(String(key).substring(0, 20) + "..", 20, (c + 1) * 20, 200);
        else
            ctx.fillText(key.toString(), 20, (c + 1) * 20, 200);

        c += 1;
    });


}