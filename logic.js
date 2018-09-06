
var info = allartists
console.log(info)

var submit = d3.select('#reset-btn');


function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset1");

    selector.append("option").text("SELECT AN ARTIST")

    info.forEach((sample) => {
        console.log("Test");
        console.log(sample.Name)
        selector.append("option").text(sample.Name).property("value", sample.Name)
    })
}

init()


var streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
});



// Drew Code with Friends
var myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 4,
    layers: [streets]
});

function optionChanged(value) {

    const color_list = ['red','blue','yellow','purple','orange','green','blueviolet','brown','pink','aqua','royalblue','cyan','gold','silver']

    var img_artist = value.replace(" ", "").toLowerCase();
    d3.select('#artist-bar').attr("src","assets/images/Bars/" + img_artist + ".png")
    d3.select('#artist-pie').attr("src","assets/images/Pie/" + img_artist + ".png")

    var finalCoor = [];
    var overlayMarkers = [];
    var eventName = [];
    var artistName = [];

    for (var i = 0; i < info.length; i++) {
        //console.log(info[i])
       
        if (info[i].Name == value) {
            for (var event = 0; event < info[i][value].length; event++) {
                var coordinates = []
                coordinates.push(parseFloat(info[i][value][event].Latitude))
                coordinates.push(parseFloat(info[i][value][event].Longitude))
                finalCoor.push(coordinates);
                eventName.push(info[i][value][event].EventName)
                artistName.push(info[i].Name)
            }
            console.log("########################################")
            console.log(eventName[i])
            console.log("########################################")
            console.log(artistName[i])

            for (var k = 0; k < finalCoor.length; k++) {
                // Push data to empty overlayMarkers list
                // overlayMarkers.push(
                    L.circle([finalCoor[k][1], finalCoor[k][0]],
                    {
                        color: "black", // outline stroke
                        fillColor: color_list[i], // fill
                        fillOpacity: 0.75,
                        radius: 10000
                    })
                   .bindPopup(`<b>Artist:</b><br>${artistName[k]}<br><b>Event:<br></b>${eventName[k]}`)
                .addTo(myMap)
            }

           


        }
        
        
    }
    console.log(overlayMarkers)


}
//

/*
var overlayMarkers = [];
var finalCoor = [];
var eventNames = [];
var city = [];

// for (var r = 0; r <info.length; r++) {
//     var artistArray = info[r].Name;
//     artistName.push(artistArray[r].Name)
// console.log(artistArray[r]);
// console.log("********************************************************"); 

// for (var q = 0; q < artistArray.length; q++){
//     var artistName=[]
//     artistName.push(artistArray[q].Name)
// }
// console.log(artistName[q]);
// console.log("********************************************************");
// }

var artistOne = []; 

for (var a = 0; a < info.length; a++) {
    artistOne.push(info[a].Name)
}

console.log(artistOne)
console.log("*******************************************************")

var overlayMarkers = [];
var finalCoor = [];
var eventNames = [];
for (var i = 0; i < info.length; i++) {
    var newArray = info[i].Events;
    console.log(info[i].Name);
    console.log("********************************************************");
    console.log(newArray)
    for (var j = 0; j < newArray.length; j++) {
        //console.log(newArray[j].Latitude);
        var coordinates = [] // [[1,3], [3,4]]
        coordinates.push(parseFloat(newArray[j].Latitude))
        coordinates.push(parseFloat(newArray[j].Longitude))
        finalCoor.push(coordinates);
        eventNames.push(newArray[j].EventName)
    }
    // console.log(newArray[j].Event);
}
console.log(finalCoor);
console.log(artistOne)

;
for (var k = 0; k < finalCoor.length; k++) {
    // Push data to empty overlayMarkers list
    overlayMarkers.push(L.circle([finalCoor[k][1], finalCoor[k][0]],
        {
            color: "black", // outline stroke
            fillColor: "lightblue", // fill
            fillOpacity: 0.75,
            radius: 5500
        }
    ).bindPopup(`<b>Name: ${artistOne[0]}<hr></b>${eventNames[k]}`))}


var overlayLayer = L.layerGroup(overlayMarkers);

var overlayMaps = {'Concert Markers': overlayLayer};

// Add Control
L.control.layers(baseMaps, overlayMaps).addTo(myMap);
*/

