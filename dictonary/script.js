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
    map[key].push(val);
}

function printResults() {
    var output = "";

    Object.keys(map).forEach(function (key) {
        output += key + " - " + map[key] + "   translation number: "
            + (countValues(map[key]) + 1) + "<br>"
    });

    document.getElementById("output").innerHTML = output;
}

function printChart() {

    var c = 1;
    Object.keys(map).forEach(function (key) {

        for (var i = 0; i <= 15; i++) {
            var can = document.getElementById("myCanvas");
            var ctx = can.getContext("2d");
            ctx.fillStyle = "black";
            ctx.font="25px Arial";
            ctx.fillText(i.toString(), (i+1) * 25, 25, 100);
        }

        ctx.fillStyle = "black";
        ctx.font="25px Arial";
        ctx.fillText(key.toString(), 0 , (c+1)*25, 100);

        for (i = 1; i <= countValues(map[key]) + 1; i++) {
            var can = document.getElementById("myCanvas");
            var ctx = can.getContext("2d");
            ctx.fillStyle = "lightseagreen";
            ctx.fillRect(i * 25, c * 25, 25, 25);

        }
        c += 1;
        output += key + " - " + map[key] + "   translation number: "
            + (countValues(map[key]) + 1) + "<br>"
    });


}