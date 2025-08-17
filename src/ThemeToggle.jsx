import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const getSystemTheme = () =>
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [theme, setTheme] = useState(getSystemTheme);

  useEffect(() => {
    // Apply DaisyUI theme
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // keyboard accessible toggle handler
  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="p-2 cursor-pointer "
    >
      {theme === "light" ? (
        <Moon size={18} aria-hidden="true" />
      ) : (
        <Sun size={18} aria-hidden="true" />
      )}
    </button>
  );
};

export default ThemeToggle;
