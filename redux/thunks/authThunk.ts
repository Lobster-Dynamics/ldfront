import axiosClient from "@/config/axiosClient";
import { axiosConfig } from "@/config/axiosConfig";
import { loadUserAuthData } from "@/lib/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import jsCookie from "js-cookie";

export const loadAuth = createAsyncThunk(
	"/auth/loadAuthFromToken",
	async () => {
		try {
			const config = axiosConfig();
			if (!config || !jsCookie.get("token")) return;

			const { data } = await axiosClient("/user/load_profile", config);

			return loadUserAuthData({
				...data,
				token: jsCookie.get("token"),
				refreshToken: jsCookie.get("refreshToken"),
			})
		} catch (error: any) {
			// TODO: Actualizar manejo de errores
		}
	},
);

export const refreshToken = createAsyncThunk("/auth/refreshToken", async () => {
	try {
		const { data } = await axiosClient.post("/user/refresh-token", {
			refreshToken: jsCookie.get("refreshToken"),
		});
		jsCookie.set("token", data.token);
		jsCookie.set("refreshToken", data.refreshToken);

		return data;
	} catch (error: any) {
		// TODO: Actualizar manejo de errores
	}
});
