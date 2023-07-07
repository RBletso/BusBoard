import fetch from 'node-fetch';

// Get StopCode

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin
    output: process.stdout
})

rl.question('Enter the bus stop code: ', (stopCode) => {
    console.log(`You entered bus stop code: ${stopCode}`);
    // Perform further operations with the stop code
    rl.close();
  });

const url = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals?`

async function busBoard() {
    const response = await fetch(url);
    const data = await response.json();
    const dataArray = [];
    let counter = 0;

    for (let i = 0; i < data.length; i++) {
        console.log(`Bus ${data[i].lineName} is arriving in ${data[i].timeToStation} seconds.`)
        dataArray.push([data[i].lineName, data[i].timeToStation])
    }

    counter++;
    if (counter === 5){
        break;
    }

    dataArray.sort(function(a,b) {
        return a[1]-b[1];
    });

    dataArray.forEach(element => console.log(`Bus ${element[0]} is arriving in ${element[1]} seconds`));
}

busBoard();