/* Global Variables */
// This is an addition to the site
// The name of the site changes when you switch to another browser
// He returns to his name at the pillar to him
let docTitle = document.title;
// Variable Name
window.addEventListener("blur", () => {
  document.title = "Come Back :(";
})
// Real Name
window.addEventListener("focus", () => {
  document.title = docTitle;
})

// OpenWeatherApi configuration
const url = 'https://api.openweathermap.org/data/2.5/weather'
// My Api Kay 
const API_KEY= '50883ea96de0d5a374b6bd4583d75116'

// HTML element to listen for click events
const button = document.getElementById('generate')

// HTML elements to get the values
const zip = document.getElementById('zip')
const feelings = document.getElementById('feelings')

// HTML elements to update dynamically
const date = document.getElementById('date')
const temp = document.getElementById('temp')
const content = document.getElementById('content')

// Create a new date instance dynamically with JS
let d = new Date()
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear()
// Fetch Weather Data from OpenWeatherApi
const fetchWeather = async (baseURL, zip, apiKey) => {
  try {
    const api = await fetch(
      `${baseURL}?zip=${zip},us&units=metric&APPID=${apiKey}`,
    )
    const result = await api.json()
    // destructuring of the result object
    const {
      main: {temp},
    } = result
    return temp
  } catch (e) {
    throw e
  }
}

// POST Request to store date, temp and user input
const saveData = async (path, data) => {
  try {
    await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (e) {
    throw e
  }
}

// Update UI dynamically
const updateUI = async (temperature, newDate, feelings) => {
  date.innerText = `Date: ${newDate}`
  // Calculating temperature without a decimal number
  temp.innerText = `Temp: ${Math.floor(temperature )} °C`
  content.innerText = `Feel: ${feelings}`
}

// Event listener
button.addEventListener('click', () => {
  // The Result Of Click
  fetchWeather(url, zip.value, API_KEY)
    .then(temp => {
      
      return {date: newDate, temp, content: feelings.value}
      
    })
    .then(data => {
      saveData('/api/projectData', data)
      return data
    })
    .then(({temp, date, content}) => updateUI(temp, date, content))
    .catch(e => {
      // There can be proper error handling with UI
      // Error Massage Alert
      alert('Please Enter Zip Code ♡', e)
    })
})