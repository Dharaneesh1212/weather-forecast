import { IoSearch } from "react-icons/io5";

const Weather = () => {
  return (
    <main className="h-screen w-screen flex items-start justify-center">
      <div className="flex items-center justify-center gap-8 m-12 text-xl">
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
