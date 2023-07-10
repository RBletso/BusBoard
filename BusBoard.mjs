import fetch from 'node-fetch';

// Get StopCode

import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// rl.question('Enter a postcode: ', (postCode) => {
//     console.log(`You entered postcode: ${postCode}`);
    
//    const url = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals?s`
const postCode = "wc2b5nt"  ;

async function busBoard() {
    const postCodeUrl = `https://api.postcodes.io/postcodes/${postCode}`;
    const postCodeResponse = await fetch(postCodeUrl);
    const postCodeData = await postCodeResponse.json();

    const lon = postCodeData.result.longitude;
    const lat = postCodeData.result.latitude;

    const radius = 300;
    const stopTypes = "NaptanPublicBusCoachTram";
    const stopsUrl = `https://api.tfl.gov.uk/StopPoint/?lat=${lat}&lon=${lon}&stopTypes=${stopTypes}&radius=${radius}`
    const stopsResponse = await fetch(stopsUrl);
    const stopsData = await stopsResponse.json();
    const stopIDs = [];
    
    for(let i = 0; i < stopsData.stopPoints.length; i++){
        stopIDs.push(stopsData.stopPoints[i].id)
    };

    stopIDs.forEach(stopID => getArrivals(stopID));
    console.log(stopIDs);
    async function getArrivals(stopID) {
        const arrivalsUrl = `https://api.tfl.gov.uk/StopPoint/${stopID}/Arrivals`
        const arrivalsResponse = await fetch(arrivalsUrl);
        const arrivalsData = await arrivalsResponse.json();

        console.log(arrivalsData);

        console.log(arrivalsData[0].stationName);
        const dataArray = [];
        let counter = 0;


            for (let i = 0; i < arrivalsData.length; i++) {
            //console.log(`Bus ${arrivalsData[i].lineName} is arriving in ${arrivalsData[i].timeToStation} seconds to ${arrivalsData[i].destinationName}.`)
            dataArray.push([arrivalsData[i].lineName, arrivalsData[i].timeToStation, arrivalsData[i].destinationName, arrivalsData[i].stationName])
            
            counter++;
            if (counter === 5){
            break;
            }
        }

        dataArray.sort(function(a,b) {
            return a[1]-b[1];
        });

        dataArray.forEach(element => console.log(`Bus ${element[0]} is arriving in ${element[1]} seconds to ${element[2]}`));
    }
    

}

busBoard();
    
rl.close();
    console.log(postCode)
//   });

