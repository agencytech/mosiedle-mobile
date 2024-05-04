import { useEffect, useState } from "react";
import { User } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/lib/api";
import { TokenService } from "@/tokens.service";
import { CloudCog } from "lucide-react-native";

export function useAuth() {
    const [token, setToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const value = await AsyncStorage.getItem("accessToken");
                if (value) {
                    setToken(value);
                } else {
                    setToken(null);
                }
                setLoading(false);
            } catch (err: any) {
                console.error(err);
                setLoading(false);
            }
        };

        loadToken();
    }, []);

    async function login(
        email: string,
        password: string
    ): Promise<User | null | undefined> {
        try {
            console.log("Login running...");
            const res = await api.post("/auth/login", {
                email,
                password,
            });

            console.log("Login response", await res.data);

            const { access_token, refresh_token, ...userData } = await res.data;

            if (!access_token) {
                console.log(userData); // Log any error details from the response
                throw new Error("Failed to log in"); // Or throw a more specific error
            }

            console.log("Logged in successfully", access_token);

            setToken(access_token);
            setRefreshToken(refresh_token);

            access_token &&
                refresh_token &&
                (await TokenService.storeTokens(access_token, refresh_token));

            const user = await fetchProfile();

            console.log("User: ", user);

            return {
                ...user,
                accessToken: access_token,
                refreshToken: refresh_token,
            };
        } catch (err: any) {
            console.error(err); // Log the entire error object
            setError(err.message || "Login failed"); // Provide a user-friendly error message
            return null;
        }
    }

    async function logout() {
        setUser(null);
        setToken(null);
        setRefreshToken(null);
        await TokenService.clearTokens();
    }

    async function fetchProfile() {
        try {
            const res = await api.get("/auth/profile"); // Use Axios for API calls
            const data = await res.data;

            setUser({
                ...data,
                accessToken: token, // Update user with accessToken
            });

            return { ...data, accessToken: token };
        } catch (err: any) {
            // ... handle error
        }
    }

    async function register(
        email: string,
        password: string,
        fullName: string
    ): Promise<User | undefined | null> {
        try {
            const res = await api.post("/auth/register", {
                email,
                password,
                fullName,
            });

            const data = await res.data;

            if (!data.access_token) {
                console.log(data);
                throw new Error("Failed to register 1");
            }

            const { access_token, refresh_token, ...userData } = data;

            setUser(userData);
            setToken(access_token);
            setRefreshToken(refresh_token);

            await TokenService.storeTokens(access_token, refresh_token);

            return data;
        } catch (err: any) {
            console.error(err);
            setError(err.message);
            return null;
        }
    }

    return {
        token,
        user,
        login,
        logout,
        error,
        loading,
        register,
        fetchProfile,
    };
}
