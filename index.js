// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOVerTimes } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   fetchCoordsByIP(ip, (error, latLng) => {
//     if (error) {
//       console.log("It didnt work!", error);
//       return;
//     }
//     console.log("It worked! Returned:", latLng);

//     fetchISSFlyOVerTimes(latLng, (error, array) => {
//       if (error) {
//         console.log("It didnt work!", error);
//         return;
//       }
//       console.log("It worked! Returned:", array);

//     })
//   });

//   console.log('It worked! Returned IP:' , ip);
// });

const { nextISSTimesForMyLocation } = require("./iss");

const passDates = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  passDates(passTimes);
});
