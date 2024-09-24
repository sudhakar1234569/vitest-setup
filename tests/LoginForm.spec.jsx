import { fireEvent, screen, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import LoginForm from "../src/LoginForm";

describe("Login Form", () => {
  beforeEach(() => render(<LoginForm />));

  it("Verify form without entering email & password - displays an error message", async () => {
    const submitBtn = screen.getByTestId("submit-button");
    fireEvent.click(submitBtn);

    await waitFor(() => {
      const emailError = screen.getByText(/Email is required/);
      const passwordError = screen.getByText(/Password is required/);

      expect(emailError).toBeVisible();
      expect(passwordError).toBeVisible();
    });
  });

  it("Verify both email and password fields filled - displays a success message", async () => {
    const email = screen.getByLabelText("Email");
    const password = screen.getByLabelText("password");
    const submitBtn = screen.getByTestId("submit-button");

    await waitFor(() => {
      fireEvent.change(email, { target: { value: "sudhakar@gmail.com" } });
      fireEvent.change(password, { target: { value: "12345" } });
    });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      const successMessage = screen.getByText("Successfully logged in");
      expect(successMessage).toBeVisible();
    });
  });
});
