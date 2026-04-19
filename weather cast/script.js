const weatherCodes = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime Fog",
    51: "Light Drizzle",
    61: "Rain",
    71: "Snow",
    95: "Thunderstorm"
};

const weatherIcons = {
    0: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
    1: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png",
    2: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
    3: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    45: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    48: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    51: "https://cdn-icons-png.flaticon.com/512/1163/1163657.png",
    61: "https://cdn-icons-png.flaticon.com/512/1163/1163657.png",
    71: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    95: "https://cdn-icons-png.flaticon.com/512/1146/1146860.png"
};

async function getWeather() {
    const lat = document.getElementById("latInput").value;
    const lon = document.getElementById("lonInput").value;

    const loader = document.getElementById("loader");
    const result = document.getElementById("weatherResult");

    if (!lat || !lon) {
        alert("Enter coordinates or use location 📍");
        return;
    }

    loader.classList.remove("hidden");
    result.classList.add("hidden");

    try {
        // Get City Name
        const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        const geoData = await geoRes.json();
        const city =
            geoData.address.city ||
            geoData.address.town ||
            geoData.address.village ||
            "Unknown";

        // Get Weather
        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const weatherData = await weatherRes.json();

        const { temperature, windspeed, weathercode } =
            weatherData.current_weather;

        // Update UI
        document.getElementById("cityName").textContent = city;
        document.getElementById("tempValue").textContent =
            Math.round(temperature);
        document.getElementById("windValue").textContent =
            windspeed + " km/h";
        document.getElementById("weatherCode").textContent =
            weatherCodes[weathercode] || "Cloudy";

        document.getElementById("weatherIcon").src =
            weatherIcons[weathercode] ||
            "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";

        loader.classList.add("hidden");
        result.classList.remove("hidden");
    } catch (error) {
        loader.classList.add("hidden");
        alert("Error fetching weather data");
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            document.getElementById("latInput").value =
                pos.coords.latitude.toFixed(4);
            document.getElementById("lonInput").value =
                pos.coords.longitude.toFixed(4);

            getWeather();
        });
    } else {
        alert("Geolocation not supported");
    }
}