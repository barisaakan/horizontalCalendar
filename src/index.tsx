import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import Calendar from "./Calendar";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <Calendar />
  </StrictMode>
);
