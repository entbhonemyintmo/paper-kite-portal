import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import axios from "axios";
import Login from "../pages/Login";

// Mock dependencies
vi.mock("axios");
vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual("react-router-dom");
	return {
		...actual,
		useNavigate: () => vi.fn(),
	};
});

const theme = createTheme();

const TestWrapper = ({ children }) => {
	const queryClient = new QueryClient();
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<RecoilRoot>
					<ThemeProvider theme={theme}>{children}</ThemeProvider>
				</RecoilRoot>
			</QueryClientProvider>
		</BrowserRouter>
	);
};

describe("Login", () => {
	const mockNavigate = vi.fn();
	const mockAxiosPost = vi.mocked(axios.post);

	beforeEach(() => {
		vi.clearAllMocks();
		vi.doMock("react-router-dom", async () => {
			const actual = await vi.importActual("react-router-dom");
			return {
				...actual,
				useNavigate: () => mockNavigate,
			};
		});

		Object.defineProperty(window, "localStorage", {
			value: {
				setItem: vi.fn(),
				getItem: vi.fn(),
				removeItem: vi.fn(),
				clear: vi.fn(),
			},
			writable: true,
		});

		import.meta.env = {
			VITE_APP_BACKEND_URL: "http://localhost:8000",
		};
	});

	it("renders email and password inputs", () => {
		render(
			<TestWrapper>
				<Login />
			</TestWrapper>
		);

		const emailInput = screen.getByTestId("email-input");
		const passwordInput = screen.getByTestId("password-input");

		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
	});

	it("logs in successfully and navigates to /send", async () => {
		const user = userEvent.setup();
		const mockResponse = {
			data: {
				token: "fake-token",
				user: { id: 1, email: "test@example.com" },
			},
		};

		mockAxiosPost.mockResolvedValueOnce(mockResponse);

		render(
			<TestWrapper>
				<Login />
			</TestWrapper>
		);

		const emailInput = screen.getByTestId("email-input");
		const passwordInput = screen.getByTestId("password-input");

		const submitButton = screen.getByRole("button", { name: /sign in/i });

		await user.type(emailInput, "test@example.com");
		await user.type(passwordInput, "password123");
		await user.click(submitButton);

		expect(mockAxiosPost).toHaveBeenCalledWith("http://localhost:8000/auth/login", {
			email: "test@example.com",
			password: "password123",
		});
	});
});
