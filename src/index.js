import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// import App from "./App";
import Search from "./search";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <div className="App">
      <Search />
      <div className="forecast"> </div>
    </div>
  </StrictMode>
);
