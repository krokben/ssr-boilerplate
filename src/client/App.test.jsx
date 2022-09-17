import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Test Resources", () => {
  test("People resource should exist", async () => {
    window.RESOURCES = ["people"];

    render(<App />);

    const helloWorld = await screen.findByText(/people/i);
    expect(helloWorld).toBeDefined(true);
  });
});
