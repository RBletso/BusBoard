// import fetch from 'node-fetch'

// async function getArrivals(stopCode) {
//     const arrivalsResponse = await fetch(https://api.tfl.gov.uk/StopPoint/{id}/ArrivalDepartures?lineIds={lineIds})
//     do {
//         const
//     } while (condition); arrivalsPredictions = await response.json();

//     return arrivalsPredictions;

import fetch from 'node-fetch';

const stopCode = "490008660N";
const url = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals?`

async function busBoard() {
    const response = await fetch(url);
    const data = await response.json();
    const dataArray = [];

    for (let i = 0; i < data.length; i++) {
        console.log(`Bus ${data[i].lineName} is arriving in ${data[i].timeToStation} seconds.`)
        dataArray.push([data[i].lineName, data[i].timeToStation])
    }

    dataArray.sort(function(a,b) {
        return a[1]-b[1];
    });

    dataArray.forEach(element => console.log(`Bus ${element[0]} is arriving in ${element[1]} seconds`));
}

busBoard();