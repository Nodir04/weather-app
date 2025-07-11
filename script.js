// OpenWeatherMap API Configuration
const API_KEY = 'b3796fb2a603db08732d8c48601835a6'; // Your OpenWeatherMap API key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const darkModeToggle = document.getElementById('darkModeToggle');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');
const weatherDisplay = document.getElementById('weatherDisplay');

// Weather display elements
const cityName = document.getElementById('cityName');
const countryName = document.getElementById('countryName');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const weatherIcon = document.getElementById('weatherIcon');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        updateDarkModeToggle();
    }
    
    // Add event listeners
    searchBtn.addEventListener('click', handleSearch);
    locationBtn.addEventListener('click', handleLocationSearch);
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Add Enter key functionality to search input
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Load default city on page load
    loadDefaultCity();
});

// Handle search by city name
async function handleSearch() {
    const city = cityInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    try {
        showLoading();
        const weatherData = await fetchWeatherByCity(city);
        displayWeather(weatherData);
    } catch (err) {
        showError(err.message);
    }
}

// Handle location-based search
async function handleLocationSearch() {
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by this browser');
        return;
    }
    
    showLoading();
    
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                const weatherData = await fetchWeatherByCoords(latitude, longitude);
                displayWeather(weatherData);
            } catch (err) {
                showError(err.message);
            }
        },
        (err) => {
            let errorMsg = 'Unable to retrieve your location';
            
            switch(err.code) {
                case err.PERMISSION_DENIED:
                    errorMsg = 'Location access denied by user';
                    break;
                case err.POSITION_UNAVAILABLE:
                    errorMsg = 'Location information is unavailable';
                    break;
                case err.TIMEOUT:
                    errorMsg = 'Location request timed out';
                    break;
            }
            
            showError(errorMsg);
        }
    );
}

// Fetch weather data by city name
async function fetchWeatherByCity(city) {
    const url = `${API_BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('City not found. Please check the spelling and try again.');
        } else if (response.status === 401) {
            throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        } else {
            throw new Error('Failed to fetch weather data. Please try again later.');
        }
    }
    
    return await response.json();
}

// Fetch weather data by coordinates
async function fetchWeatherByCoords(lat, lon) {
    const url = `${API_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
        if (response.status === 401) {
            throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
        } else {
            throw new Error('Failed to fetch weather data. Please try again later.');
        }
    }
    
    return await response.json();
}

// Display weather data
function displayWeather(data) {
    hideLoading();
    hideError();
    
    const {
        name,
        sys: { country },
        main: { temp, feels_like, humidity: humidityValue },
        weather: [{ description, icon }],
        wind: { speed }
    } = data;
    
    cityName.textContent = name;
    countryName.textContent = country;
    temperature.textContent = Math.round(temp);
    weatherDescription.textContent = description;
    feelsLike.textContent = `${Math.round(feels_like)}°C`;
    humidity.textContent = `${humidityValue}%`;
    windSpeed.textContent = `${speed} m/s`;
    
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;
    
    weatherDisplay.classList.remove('hidden');
    cityInput.value = '';
}

// Show loading state
function showLoading() {
    loading.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
    hideError();
}

// Hide loading state
function hideLoading() {
    loading.classList.add('hidden');
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    error.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
    hideLoading();
}

// Hide error message
function hideError() {
    error.classList.add('hidden');
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeToggle();
}

// Update dark mode toggle button
function updateDarkModeToggle() {
    const toggleIcon = darkModeToggle.querySelector('.toggle-icon');
    const isDarkMode = document.body.classList.contains('dark-mode');
    toggleIcon.textContent = isDarkMode ? '☀️' : '🌙';
}

// Load default city on page load
async function loadDefaultCity() {
    const defaultCity = 'London';
    
    try {
        showLoading();
        const weatherData = await fetchWeatherByCity(defaultCity);
        displayWeather(weatherData);
    } catch (err) {
        hideLoading();
        console.log('Could not load default city:', err.message);
    }
}

// Utility functions
function formatTemperature(temp) {
    return Math.round(temp);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
