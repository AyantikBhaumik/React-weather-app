import React, { useEffect, useState } from "react";
import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import getFormattedWeatherData from "./services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "New Delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message=query.q? query.q:'current location'
      toast.info('Fetching weather for '+message+'...')
      await getFormattedWeatherData({ ...query}).then((data) => {
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}!!!`)
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query]);

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700' ;

    const threshold = units==='metric'?20:70
    const currTemp =
      units === "metric"
        ? weather.temp.toFixed() - 273
        : 2 * weather.temp.toFixed() - 2 * 273 + 32;
    if(currTemp<=threshold) return "from-cyan-700 to-blue-700";
    
    return "from-yellow-700 to-orange-700"
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 mb-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} units={units} />
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true}/>
    </div>
  );
}

export default App;
