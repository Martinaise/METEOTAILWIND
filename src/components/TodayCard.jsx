import React, { useEffect, useState } from "react";
import { emojis } from "../utils/emojis";
import { formatDateToHoursMinutes } from "../utils/formatDateToHoursMinutes";
import { getEmojis } from "../utils/getEmojis";

const TodayCard = ({ data, weatherUnits }) => {
  // emodji qui vont representer la mété en cours
  const [weatherEmojis, setWeatherEmojis] = useState("");

  useEffect(() => {
    // on  verifit si on a la data
    if (!data) return;
    // calcul de la température moyenne
    const avTemp = (
      (data.temperature_2m_max + data.temperature_2m_min) /
      2
    ).toFixed(1); //1 chiffre apès la virgule

    const weatherEmojis = getEmojis(
      avTemp,
      data.precipitation_sum,
      data.windspeed_10m_max
    );
    // recup emodji qui represente la météo
    setWeatherEmojis(weatherEmojis);
  }, [data]);

  if (!data || !weatherUnits) {
    return (
      <div className="text-2xl text-center text-red-500">
        Aucune données. Affichage impossible.
      </div>
    );
  }

  return (
    
    <div className="max-w-max xl:ml-auto mx-auto bacground_todaycard">
      <div className="flex mb-20 mt-12 flex-col xl:flex-row ">
        <div className="flex flex-col">
          <div className="text-8xl mb-8 text-center xl:text-right ">
            {weatherEmojis}
          </div>
          <div className="text-3xl font-bold text-center text-white mt-auto mb-8 xl:mt-auto xl:mb-0">
            Aujourd'hui, {data.day}
          </div>
        </div>
        <div className="text-xl ml-12 xl:pl-4 xl:border-l-2 xl:border-l-indigo-500">
          <p>
            {emojis.calendar} Jour : {data.day}
          </p>
          <p>
            {emojis.rain} Pluie : {data.precipitation_sum} {weatherUnits.rain}
          </p>
          <p>
            {emojis.sunrise} Lever du soleil :{" "}
            {formatDateToHoursMinutes(new Date(data.sunrise))}
          </p>
          <p>
            {emojis.sunset} Coucher du soleil :{" "}
            {formatDateToHoursMinutes(new Date(data.sunset))}
          </p>
          <p>
            {emojis.hot} Température Max : {data.temperature_2m_max}{" "}
            {weatherUnits.temperature}
          </p>
          <p>
            {emojis.cold} Température Min : {data.temperature_2m_min}{" "}
            {weatherUnits.temperature}
          </p>
          <p>
            {emojis.wind} Vent : {data.windspeed_10m_max} {weatherUnits.wind}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodayCard;
