"use strict";


// Startposition: Göteborg koordinater
let startlat = 57.7089;
let startlon = 11.9746;


//Deklarerar variabler med tomma arrayer för data och marker
let data = [];
let marker = [];


// Initiera kartan med Leaflet
let map = L.map('map');


//Skapar variabler för motsvarande element i HTML-koden
const searchField = document.querySelector("#search");
const locationEl = document.querySelector("#location");
const latitudEl = document.querySelector("#latitud");
const longitudEl = document.querySelector("#longitud");


//Händelselyssnare för formuläret (enter = submit) som kör funktionen encodeSearch
searchField.addEventListener("submit", encodeSearch);




//Visar Gögeborg på kartan (zoomgrad 12) vid sidinladdning
window.onload = () => {
    map.setView([startlat, startlon], 12);

    // Lägg till OpenStreetMap-lager
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    marker = L.marker([startlat, startlon]).addTo(map);
}


/** 
* //Konverterar sökresultatets alla specialtecken (mellanslag, å,ä,ö osv) till en säker form som kan användas i en URL (märkte att det verkade fungera lika bra utan detta steg dock...)
*/
function encodeSearch(event) {
    //Förhindrar att man skickas vidare som man by default görs när man klickar submit i ett formulär
    event.preventDefault();

    //Hämtar det inmatade värdet i sökfältet och lägger i en variabel (gör om allt till små bokstäver så inget blir case-sensetive)
    const searchInput = document.querySelector("#where").value.toLowerCase();

    //Konverterar ovan sökresultats alla specialtecken (mellanslag, å,ä,ö osv) till en säker form som kan användas i en URL
    const encodedInput = encodeURIComponent(searchInput);

    //Kontrollerar sökresultat före och efter konvertering
    console.log(`Direkt från sökfält: ${searchInput}`);
    console.log(`Encoded: ${encodedInput}`);

    //Kör funktionen getPlace och skickar med det konverterade sökresultatet
    getPlace(encodedInput);
}

    
//Funktion för att hämta koordinater och platsträff från Nominatims API utifrån formulärets sökresultat (det inmatade värdet)
async function getPlace(encodedInput) {
    try {
        const resp = await fetch(
            `https://nominatim.openstreetmap.org/search?addressdetails=1&q=${encodedInput}&format=jsonv2&limit=1`
        );
        
        //Obs! Ändrara värde på data, inte deklarerar (det är redan gjort)
        data = await resp.json();

        //Kontrollera datan som hämtats 
        console.log(data);

        //Kör funktionen showOnMap och skickar med datan som hämtats från Nominatims API
        showOnMap(data);

    //Skriver ut felmeddelande till consol log om något fel uppstår vid inhämtningen av data från Nominatims API
    } catch (error) {
        console.error("Det har uppstått ett fel: ", error);
    }
}


//Funktion som visar sökresultatet på min karta
function showOnMap(data) {
    //Kontrollerar att jag fått med mig min data
    console.log(`Place data: `);
    console.log(data);

    //Hämtar ut datan för lat och lon ifrån första objektet i arrayen (index 0) och gör dessa till variabler
    let {lat, lon} = data[0];

    //Kontrollerar att det blivit rätt data i variablerna lat och lon
    console.log(lat, lon);

    //Hämtar ut datan för display_name ifrån första objektet i arrayen (index 0) och gör till en variabel
    let {display_name} = data [0];

    //Kontrollerar att det blivit rätt data i variabeln display_name
    console.log(display_name);

    //Ställer in kartvyn med mina hämtade värden för latitud och longitud samt ställer zoom-grad till 13
    map.setView([lat, lon], 13);

    //Sätter ut en marker på samma koordinater
    marker = L.marker([lat, lon]).addTo(map);

    //Skriver ut sökträffen och koordinaterna i text ovanför min karta
    locationEl.innerHTML = `<strong>Sökträff</strong>: ${display_name}`;
    latitudEl.innerHTML = `<strong>Latitud</strong>: ${lat}, `;
    longitudEl.innerHTML = `<strong>Longitud</strong>: ${lon}`;
}
    



    // let popupSave = L.popup()
    // .setLatLng([startlat, startlon])
    // .setContent("Vill du spara den här sökningen?")
    // .openOn(map);

    // let popup = L.popup();

    // function onMapClick(e) {
    //     popup
    //         .setLatLng(e.latlng)
    //         .setContent("You clicked the map at " + e.latlng.toString())
    //         .openOn(map);
    // }
    
    // map.on('click', onMapClick);






    //            `https://nominatim.openstreetmap.org/search?q=${encodedInput}&format=json`

