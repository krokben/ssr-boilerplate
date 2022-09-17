import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App test", () => {
  test("Element with Hello world text should exist", async () => {
    render(<App />);

    const helloWorld = await screen.findByText(/hello world/i);
    expect(helloWorld).toBeDefined(true);
  });
});
