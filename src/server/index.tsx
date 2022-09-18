import React from "react";
import ReactDOM from "react-dom/server";
import Express from "express";
import fetch from "isomorphic-fetch";
import App from "../client/App";

declare const module: any;

function main() {
  const express = Express();
  const port = process.env.PORT || 3000;

  express.use(Express.static("build"));

  express.get("/*", async (req, res, next) => {
    const response = await fetch("https://swapi.dev/api");
    const resources = Object.keys(await response.json());

    const appHTML = ReactDOM.renderToString(<App />);

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>TypeScript ReactJS SSR App</title>
          <link rel="stylesheet" href="../assets/bundle.css" />
        </head>
        <body>
          <script>
            window.RESOURCES = ${JSON.stringify(resources)};
          </script>
          <main id="root">${appHTML}</main>
          <script type="application/javascript" src="../assets/bundle.js"></script>
        </body>
      </html>
    `);
    res.end();
    next();
  });

  const server = express.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
  }
}

main();
