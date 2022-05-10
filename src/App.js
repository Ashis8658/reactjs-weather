import React from 'react';
import './App.css';

const api = {
    key: "e356fa72d1eddafd60fab8f755efc020",
    url: "https://api.openweathermap.org/data/2.5/"
}

function App() {

    const [query, setQuery] = React.useState('');
    const [weather, setWeather] = React.useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query) {
            fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(resp => resp.json())
                .then(result => { setWeather(result); setQuery(''); console.log(result) });
        }
    }


    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let month = months[d.getMonth()];
        let date = d.getDate();
        let year = d.getFullYear();

        return `${day}, ${date} ${month}, ${year}`
    }

    const setBG = () => {
        if (typeof weather.main == "undefined") return "app";
        else if (weather.main.temp <= 15) return "app cold";
        else if (weather.main.temp > 15 && weather.main.temp <= 25) return "app lcold";
        else if (weather.main.temp > 25 && weather.main.temp <= 35) return "app medium";
        else return "app warm";
    }




    return (
        <div className={setBG()}>
            <main>
                <div className="search-bar">
                    <input className="search-box" type="text" placeholder="Search city ..."
                        onChange={(e) => setQuery(e.target.value)} value={query}>
                    </input>
                    <button type="submit" className="search-btn" onClick={handleSearch}>
                        <img src="https://img.icons8.com/ios-filled/50/000000/search--v2.png" alt="" />
                    </button>
                </div>

                {(typeof weather.main != "undefined") ? (
                    <div>
                        <div className="location-box">
                            <h2 className="location">{weather.name}, {weather.sys.country}</h2>
                            <p className="date">{dateBuilder(new Date())}</p>
                            <div className="temp">{weather.main.temp}°C</div>
                            <p className="type">{weather.weather[0].main}</p>
                            <div className="other-dets">
                                <div id='exinfo'>
                                    <p className="others">
                                        <img src='https://cdn4.iconfinder.com/data/icons/weather-287/32/92-_pressure-_air-_wind-_weather-512.png' width="50" height="50"></img>
                                        <p>{weather.main.pressure} hPa</p>
                                    </p>
                                    <p className="others">
                                        <img src='https://cdn-icons-png.flaticon.com/512/483/483552.png' width="50" height="50"></img>
                                        <p> {weather.main.humidity} % </p>
                                    </p>
                                    <p className="others">
                                        <img src='https://cdn-icons-png.flaticon.com/512/54/54298.png' width="50" height="50"></img>
                                        <p>{weather.wind.speed} m/s</p>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="welcome-box">
                            <div className="welcome-text">
                                <h1>welcome</h1>
                                <p>
                                    Weather updates for arround 200,000 cities
                                </p>
                            </div>
                        </div>

                    </div>
                )
                }
            </main >
        </div >
    )
}

export default App