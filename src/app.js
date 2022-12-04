function displayTemperature (response) {
    console.log(response.data);
    document.querySelector("#temperature").innerHTML = Math.round(response.data.temperature.current);
    document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
    document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#condition").innerHTML = response.data.condition.description;

}

let apiKey = "124ftfab6b55c54beo58d91354585001"
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Odesa&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
