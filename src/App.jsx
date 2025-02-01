import { useEffect, useState } from "react";

import Header from "./components/Header";
import { createContext } from "react";
import { getPage } from "./helper.jsx";

export const Countries = createContext(null);
export default function App() {
  const [countries, setCountries] = useState([]);
  const [router, setRouter] = useState(location.hash.substring(1) || "/");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => setCountries(data));

    window.addEventListener("hashchange", () => setRouter(location.hash.substring(1)));
  }, []);
  

  return (
    <>
      <Header />
      <Countries.Provider value={{countries, router}}>
        {getPage(router)}
      </Countries.Provider>
    </>
  );
}
