
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

    const color_list = ['red','blue','yellow','purple','orange','green','blueviolet','Chartreuse ','pink','aqua','royalblue','cyan','gold','lime']

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
                        fillOpacity: 0.50,
                        radius: 40000
                    })
                   .bindPopup(`<b>Artist:</b><br>${artistName[k]}<br><b>Event:<br></b>${eventName[k]}`)
                .addTo(myMap)
            }

        }
    }
    console.log(overlayMarkers)
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}