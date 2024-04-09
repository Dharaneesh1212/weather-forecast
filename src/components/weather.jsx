import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Weather = () => {
  let key = `a8f1a3b9be704f5fd475efbe4bf3f8b7`;
  let url = `api.openweathermap.org/data/2.5/forecast?lat=36.72769&lon=51.10574&appid=${key}`;

  
  let [weather, setWeather] = useState();

  const getData = async () => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setWeather(data);
      console.log(data);
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="h-screen w-screen flex items-start justify-center">
      <div className="flex items-center justify-center gap-8 m-12 text-xl">
        <div className="flex gap-4">
          <select
            name="cities"
            id="cities"
            className="h-10 w-56 rounded-md outline-none"
          >
            <option value="">Cities</option>
            <option>City</option>
            <option>City</option>
            <option>City</option>
            <option>City</option>
          </select>
          <select
            name="cities"
            id="cities"
            className="h-10 w-56 rounded-md outline-none"
          >
            <option value="">Countries</option>
            <option>City</option>
            <option>City</option>
            <option>City</option>
            <option>City</option>
          </select>
          <select
            name="cities"
            id="cities"
            className="h-10 w-56 rounded-md outline-none"
          >
            <option value="">Time zone</option>
            <option>City</option>
            <option>City</option>
            <option>City</option>
            <option>City</option>
          </select>
          <select
            name="cities"
            id="cities"
            className="h-10 w-56 rounded-md outline-none"
          >
            <option value="">Coordinates</option>
            <option>City</option>
            <option>City</option>
            <option>City</option>
            <option>City</option>
          </select>
        </div>
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search"
            className="h-10 w-56 rounded-l-lg outline-none p-2 capitalize"
          />
          <button className="flex items-center justify-center bg-black text-white h-10 w-10 rounded-r-lg">
            <IoSearch />
          </button>
        </div>
      </div>
      <div></div>
    </main>
  );
};

export default Weather;

  // https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/table/?disjunctive.cou_name_en&sort=name