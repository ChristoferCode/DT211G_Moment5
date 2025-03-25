"use strict";


// Startposition: Göteborg koordinater
let lat = 57.7089;
let lon = 11.9746;


// Initiera kartan med Leaflet
let map = L.map('map');


document.querySelector("#where").addEventListener("input", filterCourses);

//Visar Gögeborg på kartan vid sidinladdning
window.onload = () => {
    map.setView([lat, lon], 12);

    // Lägg till OpenStreetMap-lager
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

}



let marker = L.marker([lat, lon]).addTo(map);


function filterCourses() {

}

    




    let popupSave = L.popup()
    .setLatLng([lat, lon])
    .setContent("Vill du spara den här sökningen?")
    .openOn(map);

    let popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }
    
    map.on('click', onMapClick);