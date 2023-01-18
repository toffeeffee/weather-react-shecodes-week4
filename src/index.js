import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

// import App from "./App";
import Search from "./search";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <div className="App">
      <Search />
      <div className="forecast"> </div>
      <p><a href="https://github.com/toffeeffee/weather-react-shecodes-week4">Open-source code</a>, by Iryna Komarova</p>
    </div>
  </StrictMode>
);
