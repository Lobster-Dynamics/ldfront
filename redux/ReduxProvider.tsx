"use client";

import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import interceptorsSetup from "@/config/axiosInterceptors";

interface Props {
	children: React.ReactNode;
}

export default function ReduxProvider({ children }: Props) {
	return (
		<Provider store={store}>
			{children}
		</Provider>
	);
}

// Add axios interceptors (Manage access token and refresh token)
interceptorsSetup(store);