import { EnhancedStore } from "@reduxjs/toolkit";
import axiosClient from "./axiosClient";
import { refreshToken } from "@/redux/thunks/authThunk";

const interceptorsSetup = (store: EnhancedStore) => {
	const { dispatch } = store;

	// Request interceptor to refresh access token (Executed after request with 403 status code)
	// https://www.bezkoder.com/react-redux-jwt-auth/
	axiosClient.interceptors.response.use(
		(res) => {
			return res;
		},
		async (err) => {
			const originalRequest = err.config;

			if (err.response.status === 403 && !originalRequest._retry) {
				originalRequest._retry = true;
				await dispatch(refreshToken() as any);
				return axiosClient(originalRequest);
			}

			return Promise.reject(err);
		},
	);
};

export default interceptorsSetup;
