import { useContext, useEffect, useState } from "react";

import { Countries } from "../App";

export default function HomePage() {
  const { countries } = useContext(Countries);
  const areas = new Set(countries.map((country) => country.region));

  const [selectedArea, setSelectedArea] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    location.hash = "/";
  }, []);

  return (
    <main>
      <div className="container">
        <div className="search-area">
          <input type="text" placeholder="Search for a country…" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select onChange={(e) => setSelectedArea(e.target.value)}>
            <option value={""}>All Areas</option>
            {Array.from(areas).map((area) => (
              <option key={area}>{area}</option>
            ))}
          </select>
        </div>
        <div className="countries">
          {countries
            .filter((country) => country.name.common.toLowerCase().includes(search.toLowerCase()) && country.region.includes(selectedArea))
            .map((country) => (
              <Country key={country.cca3} country={country} />
            ))}
        </div>
      </div>
    </main>
  );
}

function Country({ country }) {
  return (
    <div className="country" onClick={() => (location.hash = `/country/${country.cca3}`)}>
      <img src={country.flags.png} alt={country.name.common} />
      <div className="country-info">
        <h2>{country.name.common}</h2>
        <div className="country-data">
          <p>
            <strong>Population:</strong> {country.population}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
          <p>
            <strong>Capital:</strong> {country.capital ? country.capital.join(", ") : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
