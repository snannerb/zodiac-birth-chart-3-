import { render, screen, fireEvent } from "@testing-library/react";
import BirthForm from "../src/components/BirthForm";

test("validates form inputs", () => {
  const onSubmit = jest.fn();
  render(<BirthForm onSubmit={onSubmit} />);

  fireEvent.click(screen.getByText("Generate Chart"));
  expect(screen.getByText("Date is required.")).toBeInTheDocument();
  expect(screen.getByText("Time is required.")).toBeInTheDocument();
  expect(screen.getByText("Location is required.")).toBeInTheDocument();
  expect(onSubmit).not.toHaveBeenCalled();
});