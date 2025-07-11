Weather App

A responsive, modern weather application that displays current weather data by city name or the user’s location. The app fetches real-time data from the OpenWeatherMap API and offers a clean interface with dark mode support.
Features

    Search weather by city name

    Use device location to get local weather (via Geolocation API)

    Displays:

        Temperature and "feels like" value

        Weather description with icon

        Humidity

        Wind speed

        City and country name

    Default city loaded on startup (London)

    Dark mode toggle with preference saved to localStorage

    Loading spinner while fetching data

    Friendly error messages for:

        Invalid city names

        Location access denied

        Network or API errors

    Fully responsive and mobile-optimized layout

Technologies Used

    HTML5 – Semantic structure

    CSS3 – Flexbox, Grid, transitions, responsive and dark mode design

    JavaScript (ES6+) – Fetch API, geolocation, DOM manipulation

    OpenWeatherMap API – Real-time weather data source

Getting Started
1. Clone the Repository

git clone https://github.com/your-username/weather-app.git
cd weather-app

2. Get a Free API Key

    Visit https://openweathermap.org/api

    Sign up and obtain your free API key

3. Insert Your API Key

In script.js, replace the placeholder value in the line below:

const API_KEY = 'YOUR_API_KEY_HERE';

Replace it with your actual key:

const API_KEY = 'your_actual_api_key';

4. Run the App

Just open the index.html file in your browser — no server needed.
Project Structure

weather-app/
├── index.html       # Main HTML structure
├── style.css        # Styling, layout, dark mode
├── script.js        # Logic, API calls, interactivity
└── README.md        # Project documentation

Live Demo

If deployed via GitHub Pages, it would look like this:

https://your-username.github.io/weather-app/

(Replace your-username with your GitHub username)
Potential Enhancements

    Unit switching (°C / °F)

    5-day or hourly forecast

    Save recent searches

    Add error icon or animation for empty results

    Improve offline experience

License

This project is open-source and available under the MIT License.
Author

Developed by @nodir04
