const SubmitBtn = document.getElementById("search");



let city_name = `canterbury`
let units = `metric`
let cnt = `4`


async function fetchData(city_name, units, cnt) {

    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${API_key}&units=${units}&cnt=${cnt}`
    try {
        const response = await fetch(API_URL)

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }

        const data = await response.json();
        let icon = data.list[0].weather[0].icon
        let temp = Math.round(data.list[0].main.temp)
        let humidity = Math.round(data.list[0].main.humidity)
        let description = data.list[0].weather[0].description;
        let windSpeed = data.list[0].wind.speed;
        return { icon, temp, description, humidity, windSpeed };
    } catch (error) {
        throw new Error("Error getting data", { cause: error });
    }


}


async function getData(e) {
    e.preventDefault()

    const inputText = document.getElementById("CityName").value;
    if (inputText.length === 0) {
        const weatherDEtails = document.querySelector(".weather-details")
        const notFound = document.querySelector(".not-found")
        if (!weatherDEtails.classList.contains("none")) {
        notFound.classList.remove("none")
        weatherDEtails.classList.add("none")
    }
        window.alert("please, Enter a city name")
        return;
    }

    try {
        const {
            icon, temp, description, humidity, windSpeed
        } = await fetchData(inputText, units, cnt)

        console.log("Temperature:", temp);
        console.log("Description:", description);
        console.log("Humidity:", humidity);
        console.log("Icon code:", icon);
        console.log("Wind speed:", windSpeed);

        displayData(icon , temp, description, humidity, windSpeed)

    } catch (error) {
        console.error("Error getting weather data:", error)

    }
}


let displayData = (icon ,temp, description, humidity, windSpeed) => {
    const tempDiv = document.querySelector(".temp")
    const stateDiv = document.querySelector(".state")
    const humidityDiv = document.querySelector(".humudity-core")
    const windDiv = document.querySelector(".wind-core")
    const image = document.querySelector("#img")

    tempDiv.innerText = temp;
    stateDiv.innerText = description;
    humidityDiv.innerText = `${humidity} %`;
    windDiv.innerText = `${windSpeed} m/s`;
    image.src = `https://openweathermap.org/img/wn/${icon}@2x.png`

    const weatherDEtails = document.querySelector(".weather-details")
    const notFound = document.querySelector(".not-found")
    if (weatherDEtails.classList.contains("none")) {
        notFound.classList.add("none")
        weatherDEtails.classList.remove("none")
    }

}



SubmitBtn.addEventListener("click", getData);


