import React, { useState, useEffect, useCallback } from "react";
import TodayCard from "./components/TodayCard";
import WeekDayCard from "./components/WeekDayCard";
import { formatWeatherDataDaily } from "./utils/formatWeatherDataDaily";


function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [weatherUnits, setWeatherUnits] = useState({});
  const [geoLoc, setGeoLoc] = useState({ latitude: 0, longitude: 0 });

  const fetchWeather = useCallback(async (fetchUrl) => {
    setError(false);
    try {
      // recup de la data
      const res = await fetch(fetchUrl);
      const data = await res.json();
// si l'objet est  vide ca affiche rien
      if (Object.keys(data).length === 0) {
        setError(true);
      } else {
        // on appel la fonction de formatWeatherDataDaily.js
        const formattedDailyData = formatWeatherDataDaily(data.daily);
        setWeatherData(formattedDailyData);
// on recup les unités donc on a besoin
        setWeatherUnits({
          rain: data.daily_units.precipitation_sum,
          temperature: data.daily_units.temperature_2m_max,
          wind: data.daily_units.windspeed_10m_max,
        });
      }
    } catch (error) {
      setError(true);
    }
  }, []);
//recup donner
  useEffect(() => {
    setIsLoading(true);
// recuper donner gps on verifie si nvigayeur compatible
    if (!navigator.geolocation) {
      window.alert(
        "Votre navigateur ne permet pas la géolocalisation pour utiliser cette application !"
      );
    }
// recup donnée gps avec cette fonction
    getGeolocalisation();

    // fonction fetch qui permet de recup donnée dans l'API
    fetchWeather(
      `https://api.open-meteo.com/v1/forecast?latitude=${geoLoc.latitude}&longitude=${geoLoc.longitude}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&timezone=Europe%2FLondon`
    ).then(() => setIsLoading(false));
  }, [fetchWeather, geoLoc.latitude, geoLoc.longitude]);

  const getGeolocalisation = () => {
    navigator.geolocation.getCurrentPosition(
      // position contient les données degeolocalisation
      (position) => {
        setGeoLoc({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        setError(true);
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen h-max flex justify-center items-start p-8 md:px-20">
        <p className="text-center">Chargement ...</p>
      </div>
    );
  }
// si on est en chargement
  if (!isLoading && weatherData.length === 0) {
    return (
      <div className="min-h-screen h-max   flex justify-center items-start p-8 md:px-20">
        <p className="text-center">
          Aucune données n'a pu être récupérée. Merci de réessayer.
        </p>
      </div>
    );
  }
// si jamais il y'a une erreur
  if (error) {
    return (
      <div className="min-h-screen h-max  flex justify-center items-start p-8 md:px-20">
        <p className="text-red-500 text-center">
          Une erreur est survenue lors de la récupération des prévisions météo
          ...
        </p>
      </div>
    );
  }
// si tou va bien 
  return (
    <div className="min-h-screen h-max  flex justify-center items-start p-8 md:px-20 ">
      <div className="w-full max-w-7xl bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg shadow-lg px-4 py-4 xl:py-12 xl:px-28 md:px-12 md:py-8 ">
      {/* on importe le composant TodayCard */}
        <TodayCard data={weatherData[0]} weatherUnits={weatherUnits} />
        <div className=" grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-6">
          {weatherData &&
            weatherData
              .slice(1, weatherData.length)
              .map((data, index) => (
                // on inporte le composant WeekDayCard
                <WeekDayCard
                  key={index}
                  data={data}
                  weatherUnits={weatherUnits}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
