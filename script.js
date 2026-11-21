// const GEOCODING_API_URL = `https://geocoding-api.open-meteo.com/v1/search?name=${customLoc}`
const WEATHER_API_URL = `https://api.open-meteo.com/v1/forecast?`

const THE_FULL_URL = `https://api.open-meteo.com/v1/forecast?latitude=29.767944&longitude=-95.40476&daily=weather_code,sunrise,sunset,precipitation_probability_max,precipitation_hours,precipitation_sum,moon_phase&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,precipitation_probability,precipitation,rain,apparent_temperature,snowfall,weather_code,wind_speed_10m,uv_index,is_day&current=temperature_2m,precipitation,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code,is_day,apparent_temperature,relative_humidity_2m,rain,showers,snowfall&timeformat=unixtime&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`

const extraStuff = `&daily=weather_code,sunrise,sunset,precipitation_probability_max,precipitation_hours,precipitation_sum,moon_phase&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,precipitation_probability,precipitation,rain,apparent_temperature,snowfall,weather_code,wind_speed_10m,uv_index,is_day&current=temperature_2m,precipitation,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code,is_day,apparent_temperature,relative_humidity_2m,rain,showers,snowfall&timeformat=unixtime&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`

async function runProgram(){
    console.log("DOM Loaded; ready to go!")
    const data = await fetchAllData("29.767944", "-95.40476")
    console.log(data);
    updateAllCards(data);
}

// let currentTemp = 0
// let currentCondition = ""
// let currentFeelsLike = 0
// let currentJacket = 0
// let currentUV = 0

// let sunriseTime = 0
// let sunsetTime = 0

// let sevenAm = {
//     "condition": "",
//     "temp": 0
// }

// let nineAm = {
//     "condition": "",
//     "temp": 0
// }

// let elevenAm = {
//     "condition": "",
//     "temp": 0
// }

// let onePm = {
//     "condition": "",
//     "temp": 0
// }

// let threePm = {
//     "condition": "",
//     "temp": 0
// }

// let fivePm = {
//     "condition": "",
//     "temp": 0
// }

// let sevenPm = {
//     "condition": "",
//     "temp": 0
// }

// let ninePm = {
//     "condition": "",
//     "temp": 0
// }

// let todayPrecip = 0
// let todayPrecipChance = 0
// let todayRain = 0
// let todaySleet = 0
// let todaySnow = 0

// let tomorrow = {
//     "date": "",
//     "condition": "",
//     "temp": 0
// }

// let twoDays = {
//     "date": "",
//     "condition": "",
//     "temp": 0
// }

// let threeDays = {
//     "date": "",
//     "condition": "",
//     "temp": 0
// }

// let fourDays = {
//     "date": "",
//     "condition": "",
//     "temp": 0
// }

// let lightningNearby = false

// let aqIndex = 0
// let uvIndex = 0

const stateAbbs = {
    "alabama": "AL",
    "alaska": "AK",
    "arizona": "AZ",
    "arkansas": "AR",
    "california": "CA",
    "colorado": "CO",
    "connecticut": "CT",
    "delaware": "DE",
    "florida": "FL",
    "georgia": "GA",
    "hawaii": "HI",
    "idaho": "ID",
    "illinois":"IL",
    "indiana": "IN",
    "iowa": "IA",
    "kansas": "KS",
    "kentucky": "KY",
    "louisana": "LA",
    "maine": "ME",
    "maryland": "MD",
    "massachusetts": "MA",
    "michigan": "MI",
    "minnesota": "MN",
    "mississippi": "MS",
    "missouri": "MO",
    "montana": "MT",
    "nebraska": "NE",
    "nevada": "NV",
    "new hampshire": "NH",
    "new jersey": "NJ",
    "new mexico": "NM",
    "new york": "NY",
    "north carolina": "NC",
    "north dakota": "ND",
    "ohio": "OH",
    "oklahoma": "OK",
    "oregon": "OR",
    "pennsylvania": "PA",
    "rhode island": "RI",
    "south carolina": "SC",
    "south dakota": "SD",
    "tennessee": "TN",
    "texas": "TX",
    "utah": "UT",
    "vermont": "VT",
    "virginia": "VA",
    "washington": "WA",
    "west virginia": "WV",
    "wisconsin":"WI",
    "wyoming":"WY"
}

const conditionCodes = {
    "0": "Clear",
    "1": "Sunny",
    "2": "Partly Cloudy",
    "3": "Cloudy",
    "45": "Foggy",
    "48": "Foggy",
    "51": "Light Rain",
    "53": "Moderate Rain",
    "55": "Heavy Rain",
    "56": "Light Freezing Rain",
    "57": "Heavy Freezing Rain",
    "61": "Light Rain",
    "63": "Moderate Rain",
    "65": "Heavy Rain",
    "66": "Light Freezing Rain",
    "67": "Heavy Freezing Rain",
    "71": "Light Snow",
    "73": "Moderate Snow",
    "75": "Heavy Snow",
    "77": "Moderate Snow",
    "80": "Light Rain",
    "81": "Moderate Rain",
    "82": "Heavy Rain",
    "85": "Light Snow",
    "86": "Heavy Snow",
    "95": "Thunderstorm",
    "96": "Thunderstorm",
    "97": "Thunderstorm",
    "99": "Thunderstorm"
}

const conditionIcons = {
    "Sunny":"sunny-icon.png",
    "Partly Cloudy":"partly-cloudy-icon.png",
    "Clear":"clear-icon.png",
    "Moderate Rain":"rain-icon.png",
    "Light Rain":"rain-icon.png",
    "Heavy Rain":"rain-icon.png",
    "Cloudy":"cloudy-icon.png"
}

const conditionBackgrounds = {
    "Partly Cloudy":"partly-cloudy.jpg"
}

async function fetchAllData(latitude, longitude){
    try {
        const fullURL = `${WEATHER_API_URL}latitude=${latitude}&longitude=${longitude}${extraStuff}`;
        // console.log(fullURL);
        // const fullURL = THE_FULL_URL
        console.log(fullURL);
        const response = await fetch(fullURL);
        // console.log(response)
        if (!response.ok) {
            throw new Error
            (`Request failed: ${response.status}`);
        }
        const weatherData = await response.json();
        return weatherData;
    }
    catch (error) {
        console.log('error', error);
        return null;
    }
}

function updateAllCards(data) {
    updateConditionsCard(data);
}

function updateConditionsCard(data) {
    const currentTempText = document.querySelector('#temp')
    const currentConditionIcon = document.querySelector('#condition-icon')
    const currentConditionText = document.querySelector('#condition')
    const currentFeelsLikeText = document.querySelector('#feels-like');
    const currentJacketText = document.querySelector('#jacket-index');
    const currentHumidityText = document.querySelector('#humidity')

    console.log("daata:")
    console.log(data)

    currentTempText.textContent = `${Math.round(data.current.temperature_2m)}°`

    let conditionCode = data.current.weather_code

    let theConditionWords = conditionCodes[conditionCode]

    currentConditionText.textContent = `${theConditionWords}`

    currentConditionIcon.src = conditionIcons[theConditionWords]

    currentFeelsLikeText.textContent = `Feels Like: ${Math.round(data.current.apparent_temperature)}°`

    if (data.current.apparent_temperature < 60) {
        currentJacketText.textContent = `Jacket Index: Jacket Reccomended`
    }
    else {
        currentJacketText.textContent = `No jacket needed!`
    }

    currentHumidityText.textContent = `Humidity: ${data.current.relative_humidity_2m}%`
}

function updateHourlyCard(data) {
    const sunriseTimeText = document.querySelector('#sunrise-time')
    const sunsetTimeText = document.querySelector('#sunset-time')
}

function updateBackground() {
}

document.addEventListener("DOMContentLoaded", runProgram);