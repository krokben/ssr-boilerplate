import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import "./main.css";

const container = document.getElementById("root");
const root = hydrateRoot(container, <App />);
