"use strict";

/* Global Variables */
var docTitle = document.title;
window.addEventListener("blur", function () {
  document.title = "Come Back :(";
});
window.addEventListener("focus", function () {
  document.title = docTitle;
}); // OpenWeatherApi configuration

var url = 'https://api.openweathermap.org/data/2.5/weather'; // My Api Kay 

var API_KEY = '50883ea96de0d5a374b6bd4583d75116'; // HTML element to listen for click events

var button = document.getElementById('generate'); // HTML elements to get the values

var zip = document.getElementById('zip');
var feelings = document.getElementById('feelings'); // HTML elements to update dynamically

var date = document.getElementById('date');
var temp = document.getElementById('temp');
var content = document.getElementById('content'); // Create a new date instance dynamically with JS

var d = new Date();
var newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear(); // Fetch Weather Data from OpenWeatherApi

var fetchWeather = function fetchWeather(baseURL, zip, apiKey) {
  var api, result, _temp;

  return regeneratorRuntime.async(function fetchWeather$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("".concat(baseURL, "?zip=").concat(zip, ",us&units=metric&APPID=").concat(apiKey)));

        case 3:
          api = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(api.json());

        case 6:
          result = _context.sent;
          // destructuring of the result object
          _temp = result.main.temp;
          return _context.abrupt("return", _temp);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          throw _context.t0;

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; // POST Request to store date, temp and user input


var saveData = function saveData(path, data) {
  return regeneratorRuntime.async(function saveData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch(path, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }));

        case 3:
          _context2.next = 8;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          throw _context2.t0;

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 5]]);
}; // Update UI dynamically


var updateUI = function updateUI(temperature, newDate, feelings) {
  return regeneratorRuntime.async(function updateUI$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          date.innerText = "Date: ".concat(newDate); // Calculating temperature without a decimal number

          temp.innerText = "Temp: ".concat(Math.floor(temperature), " \xB0C");
          content.innerText = "Feel: ".concat(feelings);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // Event listener


button.addEventListener('click', function () {
  // The Result Of Click
  fetchWeather(url, zip.value, API_KEY).then(function (temp) {
    return {
      date: newDate,
      temp: temp,
      content: feelings.value
    };
  }).then(function (data) {
    saveData('/api/projectData', data);
    return data;
  }).then(function (_ref) {
    var temp = _ref.temp,
        date = _ref.date,
        content = _ref.content;
    return updateUI(temp, date, content);
  })["catch"](function (e) {
    // There can be proper error handling with UI
    // Error Massage Alert
    alert('Please Enter Zip Code ♡', e);
  });
});
//# sourceMappingURL=app.dev.js.map
