import { useContext, useEffect, useState } from "react";

import { Countries } from "../App";

export default function Country() {
  const { countries, router } = useContext(Countries);
  if (router.split("/")[1] !== "country") {
    location.hash = "/";
    return;
  }

  const [countryCode, setCountryCode] = useState(location.hash.substring(1).split("/").at(-1));
  const country = countries.find((country) => country.cca3 === countryCode);
  useEffect(() => {
    setCountryCode(location.hash.substring(1).split("/").at(-1));
  }, [router]);
  console.log(country);
  return (
    <>
      <button className="whiteBtn" onClick={() => (location.hash = "/")}>
        <img src="/svg/back-arrow.svg" />
        <span>Back</span>
      </button>
      {country && (
        <div className="country-details">
          <img src={country.flags.svg} alt={country.name.common} />
          <div className="country-details-area">
          <h1>{country.name.common}</h1>
            <div className="country-details-mainData">
              <p>
                <strong>Native Name:</strong> {country.name.nativeName?.[Object.keys(country.name.nativeName)[0]]?.official || "N/A"}
              </p>
              <p>
                <strong>Population:</strong> {country?.population}
              </p>
              <p>
                <strong>Region:</strong> {country?.region}
              </p>
              <p>
                <strong>Sub Region:</strong> {country?.subregion || "N/A"}
              </p>
              <p>
                <strong>Capital:</strong> {country?.capital?.join(", ") || "N/A"}
              </p>
            </div>
            <div className="country-details-otherData">
              <p>
                <strong>Top Level Domain:</strong> {country?.tld?.join(", ") || "N/A"}
              </p>
              <p>
                <strong>Currencies:</strong>{" "}
                {Object.values(country?.currencies || "")
                  .map((x) => x.name)
                  .join(", ") || "N/A"}
              </p>
              <p>
                <strong>Languages:</strong> {Object.values(country?.languages || "").join(", ") || "N/A"}
              </p>
            </div>
            <div className="border-countries">
              <strong>Border Countries:</strong>
              {country?.borders?.map((border) => (
                <button key={border} className="whiteBtn" onClick={() => (location.hash = `/country/${border}`)}>
                  {countries.find((country) => country.cca3 === border).name.common}
                </button>
              )) || "N/A"}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
