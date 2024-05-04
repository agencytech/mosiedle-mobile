import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TokenService } from "@/tokens.service";

const API_URL = "http://192.168.1.3:3000"; // Replace with your actual URL

const api = axios.create({
    baseURL: API_URL,
});

// Request interceptor to add access token if available
api.interceptors.request.use(
    async (config) => {
        const tokens = await (TokenService
            ? TokenService.getTokens()
            : AsyncStorage.getItem("accessToken")); // Adapt based on your chosen approach
        if (typeof tokens === "object" && tokens) {
            config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        } else if (typeof tokens === "string" && tokens) {
            config.headers.Authorization = `Bearer ${tokens}`;
        }
        // console.log("Request config", config); // Log the request configuration
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite loop
            const tokens = await (TokenService
                ? TokenService.getTokens()
                : AsyncStorage.getItem("accessToken"));
            if (typeof tokens === "object" && tokens && tokens.refreshToken) {
                try {
                    console.log("Refreshing tokens", tokens.refreshToken); // Log the tokens (optional)
                    const newTokens = await TokenService.refreshTokens(
                        tokens.refreshToken
                    );
                    console.log("New tokens", newTokens); // Log the new tokens
                    await TokenService.storeTokens(
                        newTokens.accessToken,
                        newTokens.refreshToken
                    );

                    console.log("Tokens refreshed", newTokens); // Log the new tokens
                    originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    // Handle failed refresh (e.g., logout user)
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
