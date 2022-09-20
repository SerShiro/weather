const input = document.querySelector('#inputField')
input.addEventListener('keyup', pressKey)
const apiKey = 'b67a1ced0d7e374bdd5ee83c6b87a351'
const link = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

getMoscow()

async function getMoscow() {
    const res = await fetch(`${link}moscow&appid=${apiKey}`)
    const result = await res.json()
    rewriteRes(result)
}

document.querySelector('button').addEventListener('click', getWeather)

function pressKey(e) {
    if (e.keyCode === 13) {
        getWeather()
    }
}

async function getWeather() {
    const res = await fetch(`${link}${input.value}&appid=${apiKey}`)
    const result = await res.json()
    rewriteRes(result)
}

function rewriteRes(result) {
    document.querySelector('#cityCountry').textContent = `${result.name}, ${result.sys.country}`
    getNowDate()
    document.querySelector('#temperature').textContent = `${Math.round(result.main.temp)}°`
    document.querySelector('#feelsLike').textContent = `Feels like: ${Math.round(result.main.feels_like)}°`
    document.querySelector('#condition').textContent = `${result.weather[0].main}`
    document.querySelector('#minMax').textContent = `Min: ${Math.round(result.main.temp_min)}° Max: ${Math.round(result.main.temp_max)}°`
}

function getNowDate() {
    const date = new Date()
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    document.querySelector('#nowDate').textContent = `${weekday[date.getDay()]} ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`
}