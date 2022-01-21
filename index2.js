const { nextISSTimesForMyLocation } = require("./iss_promised")
const { passDates } = require("./index")

nextISSTimesForMyLocation((error, passDates) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  passDates(passDates);
});


