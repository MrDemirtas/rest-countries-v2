import { useEffect, useState } from "react";

function getSystemThemePref() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Header() {
  const [theme, setTheme] = useState(localStorage.theme || getSystemThemePref());

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  function handleChange(e) {
    const changedTheme = e.target.checked ? "dark" : "light";
    setTheme(changedTheme);
    localStorage.theme = changedTheme;
  }

  return (
    <header>
      <h1>Where in the world?</h1>
      <label>
        <input type="checkbox" onChange={handleChange} defaultChecked={theme === "dark"} />
        <img src="/svg/moon.svg" />
        <span>Dark Mode</span>
      </label>
    </header>
  );
}
