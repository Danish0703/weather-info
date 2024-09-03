const apiKey = 'f2bf844d403861f350ea2e29ce840c24';  // Replace with your OpenWeatherMap API key

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) return alert('Please enter a city name');

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiURL);

        // Check if the city was not found (404 error)
        if (response.status === 404) {
            throw new Error('City not found. Please try again.');
        }

        // If the response is not OK (non 2xx status), throw a generic error
        if (!response.ok) {
            throw new Error('An error occurred while fetching the weather data.');
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        alert(error.message);
        clearWeatherDisplay();  // Clear the weather display if there's an error
    }
}

function displayWeather(data) {
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');

    cityName.textContent = `Weather in ${data.name}`;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    description.textContent = `Condition: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function clearWeatherDisplay() {
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');

    cityName.textContent = '';
    temperature.textContent = '';
    description.textContent = '';
    humidity.textContent = '';
    windSpeed.textContent = '';
}
