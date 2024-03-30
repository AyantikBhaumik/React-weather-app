import React from 'react'
import {
    UilArrowUp,
    UilArrowDown,
    UilTemperature,
    UilTear,
    UilWind,
} from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService';

function TemperatureAndDetails({weather:{details, icon, temp, temp_min, temp_max, speed, humidity, feels_like}, units}) {
    const formatTextColor = () => {
      if (!details) return "text-cyan-300";

      const threshold = units === "metric" ? 20 : 70;
      const currTemp =
        units === "metric"
          ? temp.toFixed() - 273
          : 2 * temp.toFixed() - 2 * 273 + 32;
      if (currTemp <= threshold) return "text-cyan-300";

      return "text-red-300";
    };

  return (
    <div>
      <div className={`flex items-center justify-center py-6 text-xl ${formatTextColor()}`}>
        <p>{details}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-3">

        <img src={iconUrlFromCode(icon)} className="w-20" />
        
        <p className="text-5xl">
          {units === "metric"
            ? `${temp.toFixed() - 273}°`
            : `${2 * temp.toFixed() - 2 * 273 + 32}°`}
        </p>
        
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size={18} className="mr-1" />
            Real feel:
            <span className="font-medium ml-1">
              {units === "metric"
                ? `${feels_like.toFixed() - 273}°`
                : `${2 * feels_like.toFixed() - 2 * 273 + 32}°`}
            </span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${speed.toFixed()}kmph`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">

        <UilArrowUp />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">
            {units === "metric"
              ? `${temp_max.toFixed() - 273}°`
              : `${2 * temp_max.toFixed() - 2 * 273 + 32}°`}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilArrowDown />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">
            {units === "metric"
              ? `${temp_min.toFixed() - 273}°`
              : `${2 * temp_min.toFixed() - 2 * 273 + 32}°`}
          </span>
        </p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails
