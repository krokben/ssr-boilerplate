import React, { useState, useEffect } from "react";
import "./app.css";

const App = () => {
  const [resources, setResources] = useState<string[]>([]);

  useEffect(() => {
    setResources(window.RESOURCES);
  }, []);

  return (
    <ul className="app">
      {resources.map((resource) => (
        <li key={resource}>{resource}</li>
      ))}
    </ul>
  );
};

export default App;
