import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";

const Weather = () => {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch city, country, and timezone data
        const response = await fetch(
          "https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=1000"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const records = data.records || [];

        // Extract unique cities, countries, and timezones
        const uniqueCities = [...new Set(records.map((record) => record.fields.name).filter(Boolean))];
        const uniqueCountries = [...new Set(records.map((record) => record.fields.cou_name_en).filter(Boolean))];
        const uniqueTimezones = [...new Set(records.map((record) => record.fields.timezone).filter(Boolean))];

        // Update state with unique values
        setCities(uniqueCities);
        setCountries(uniqueCountries);
        setTimezones(uniqueTimezones);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const fetchDataForSelectedLocation = async () => {
    if (!selectedLocation) return;

    const { lat, lon } = selectedLocation;
    const key = "a8f1a3b9be704f5fd475efbe4bf3f8b7";
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await res.json();
      setWeather(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching weather data:", error.message);
    }
  };

  useEffect(() => {
    fetchDataForSelectedLocation();
  }, [selectedLocation]);

  const handleCityChange = (event) => {
    const cityName = event.target.value;
    const city = cities.find((c) => c === cityName);
    setSelectedLocation(city);
  };

  const handleCountryChange = (event) => {
    const countryName = event.target.value;
    const country = countries.find((c) => c === countryName);
    setSelectedLocation(country);
  };

  const handleTimezoneChange = (event) => {
    const timezoneName = event.target.value;
    const timezone = timezones.find((t) => t === timezoneName);
    setSelectedLocation(timezone);
  };

  const handleSearch = async () => {
    if (!searchQuery) return;

    const key = "a8f1a3b9be704f5fd475efbe4bf3f8b7";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&appid=${key}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await res.json();
      setSelectedLocation({ lat: data.coord.lat, lon: data.coord.lon });
      setWeather(data);
    } catch (error) {
      console.log("Error fetching weather data:", error.message);
    }
  };

  return (
    <main className="h-screen w-screen flex items-start justify-center">
      <div className="flex items-center justify-center gap-8 m-12 text-xl">
        <div className="flex gap-4">
          <select
            name="cities"
            id="cities"
            className="h-10 w-56 rounded-md outline-none"
            onChange={handleCityChange}
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            name="countries"
            id="countries"
            className="h-10 w-56 rounded-md outline-none"
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          <select
            name="timezones"
            id="timezones"
            className="h-10 w-56 rounded-md outline-none"
            onChange={handleTimezoneChange}
          >
            <option value="">Select Timezone</option>
            {timezones.map((timezone, index) => (
              <option key={index} value={timezone}>
                {timezone}
              </option>
            ))}
          </select>
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Search"
              className="h-10 w-56 rounded-l-lg outline-none p-2 capitalize"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="flex items-center justify-center bg-black text-white h-10 w-10 rounded-r-lg"
              onClick={handleSearch}
            >
              <IoSearch />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Weather;
