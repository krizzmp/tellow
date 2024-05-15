import "@testing-library/jest-dom/vitest";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { App } from "./app";

describe("Focus management", () => {
  it("should focus the next button when pressing ArrowDown", async () => {
    render(<App />);
    const button1 = screen.getByText("Button 1");
    const button2 = screen.getByText("Button 2");
    button1.focus();
    fireEvent.keyUp(window, { key: "ArrowDown" });
    expect(button2).toHaveFocus();
  });

  it("should focus the previous button when pressing ArrowUp", async () => {
    render(<App />);
    const button1 = screen.getByText("Button 1");
    const button2 = screen.getByText("Button 2");
    button2.focus();
    fireEvent.keyUp(window, { key: "ArrowUp" });
    expect(button1).toHaveFocus();
  });

  it("should focus the next row when pressing ArrowDown", async () => {
    render(<App />);
    const button1 = screen.getByText("Button 3");
    const button2 = screen.getByText("Button 6");
    button1.focus();
    fireEvent.keyUp(window, { key: "ArrowDown" });
    expect(button2).toHaveFocus();
  });

  it("should focus the previous row when pressing ArrowDown", async () => {
    render(<App />);
    const button1 = screen.getByText("Button 6");
    const button2 = screen.getByText("Button 3");
    button1.focus();
    fireEvent.keyUp(window, { key: "ArrowUp" });
    expect(button2).toHaveFocus();
  });

  it("should focus the next button when pressing ArrowRight", async () => {
    render(<App />);
    const button1 = screen.getByText("Button 7");
    const button2 = screen.getByText("Button 8");
    button1.focus();
    fireEvent.keyUp(window, { key: "ArrowRight" });
    expect(button2).toHaveFocus();
  });

  it("should focus the previous button when pressing ArrowLeft", async () => {
    render(<App />);
    const button1 = screen.getByText("Button 8");
    const button2 = screen.getByText("Button 7");
    button1.focus();
    fireEvent.keyUp(window, { key: "ArrowLeft" });
    expect(button2).toHaveFocus();
  });

  it("should focus the next column when pressing ArrowRight", async () => {
    render(<App />);
    const button1 = screen.getByText("Button 3");
    const button2 = screen.getByText("Button 4");
    button1.focus();
    fireEvent.keyUp(window, { key: "ArrowRight" });
    expect(button2).toHaveFocus();
  });

  it("should focus the previous column when pressing ArrowLeft", async () => {
    render(<App />);
    const button1 = screen.getByText("Button 4");
    const button2 = screen.getByText("Button 3");
    button1.focus();
    fireEvent.keyUp(window, { key: "ArrowLeft" });
    expect(button2).toHaveFocus();
  });
  it("should focus the previous column when pressing ArrowLeft 2", async () => {
    render(<App />);
    const button1 = screen.getByText("Button 5");
    const button2 = screen.getByText("Button 3");
    button1.focus();
    fireEvent.keyUp(window, { key: "ArrowLeft" });
    expect(button2).toHaveFocus();
  });

  it("should focus the next row when pressing ArrowDown from the end of a column", async () => {
    render(<App />);
    const button1 = screen.getByText("Button 5");
    const button2 = screen.getByText("Button 6");
    button1.focus();
    fireEvent.keyUp(window, { key: "ArrowDown" });
    expect(button2).toHaveFocus();
  });
});
