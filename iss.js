const request = require("request");

const fetchMyIP = (callback) => {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const myIP = JSON.parse(body).ip;
    callback(null, myIP);
    return;
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const resultObj = JSON.parse(body);
    const latitude = resultObj.latitude;
    const longitude = resultObj.longitude;
    const ltdlng = { latitude, longitude };
    callback(null, ltdlng);
    return;
  });
};

const fetchISSFlyOVerTimes = (coords, callback) => {
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        callback(
          Error(
            `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`
          ),
          null
        );
        return;
      }
      const passes = JSON.parse(body).response;
      callback(null, passes);
      return;
    }
  );
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, latLng) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOVerTimes(latLng, (error, array) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, array);
      });
    });
  });
};
module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOVerTimes,
  nextISSTimesForMyLocation,
};
