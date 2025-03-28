"use strict";


// Startposition: Göteborg koordinater
let startlat = 57.7089;
let startlon = 11.9746;
let data = [];
let marker = [];


// Initiera kartan med Leaflet
let map = L.map('map');



//Hämtar det inmatade värdet i sökfältet och lägger i en variabel (gör om allt till små bokstäver så inget blir case-sensetive)

const searchField = document.querySelector("#search");
const locationEl = document.querySelector("#location");
const latitudEl = document.querySelector("#latitud");
const longitudEl = document.querySelector("#longitud");

searchField.addEventListener("submit", encodeSearch);





//Visar Gögeborg på kartan vid sidinladdning
window.onload = () => {
    map.setView([startlat, startlon], 12);

    // Lägg till OpenStreetMap-lager
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    marker = L.marker([startlat, startlon]).addTo(map);

}




function encodeSearch(event) {
    event.preventDefault();

    const searchInput = document.querySelector("#where").value.toLowerCase();

    const encodedInput = encodeURIComponent(searchInput);

    console.log(`Direkt från sökfält: ${searchInput}`);
    console.log(`Encoded: ${encodedInput}`);

    getPlace(encodedInput);
}

    

async function getPlace(encodedInput) {
    try {
        const resp = await fetch(
            `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodedInput}&format=jsonv2&limit=1`
        );

        const data = await resp.json();

        console.log(data);

     

        showOnMap(data);

    } catch (error) {
        console.error("Det har uppstått ett fel: ", error);
    }
   
}


function showOnMap(data) {
    console.log(`Place data: `);
    console.log(data);

    let {lat, lon} = data[0];

    console.log(lat, lon);

    let {display_name} = data [0];

    console.log(display_name);


    map.setView([lat, lon], 13);
    marker = L.marker([lat, lon]).addTo(map);

    locationEl.innerHTML = `<strong>Sökträff</strong>: ${display_name}`;
    latitudEl.innerHTML = `<strong>Latitud</strong>: ${lat}, `;
    longitudEl.innerHTML = `<strong>Longitud</strong>: ${lon}`;
    
}
    

    let popupSave = L.popup()
    .setLatLng([startlat, startlon])
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
