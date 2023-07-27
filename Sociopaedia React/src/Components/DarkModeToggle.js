// DarkModeToggle.js
import React, { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has dark mode preference stored in local storage
    const darkModePreference = localStorage.getItem("darkMode");

    if (darkModePreference === "true") {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Save user preference to local storage
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="dark-mode-toggle">
        <IconButton
          color="inherit"
          onClick={handleToggle}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </div>
      {/* Your app content */}
    </ThemeProvider>
  );
};

export default DarkModeToggle;
