import { useEffect, useState } from "react";
import { User } from "../types";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

export function useAuth() {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (token) {
            fetchUser().catch((err) => {
                console.error(err);
                setToken(null);
            });
        }
    }, [token]);

    useEffect(() => {
        const loadToken = async () => {
            await SecureStore.getItemAsync("token")
                .then((value) => {
                    if (value) {
                        setToken(value);
                    } else {
                        setToken(null);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        };

        loadToken();
    }, []);

    async function login(
        email: string,
        password: string
    ): Promise<User | null | undefined> {
        try {
            const res = await fetch("http://192.168.1.3:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (res.status !== 200) {
                console.log(await res.json());
                throw new Error("Failed to log in");
            }

            const { access_token } = await res.json();

            setToken(access_token);
            await SecureStore.setItemAsync("token", access_token);

            console.log("Logged in", access_token);
        } catch (err: any) {
            console.error(err);
            setError(err.message);
            return null;
        }

        fetchUser()
            .then((userData) => {
                return userData;
            })
            .catch((err) => {
                console.error(err);
                setToken(null);
                return null;
            });
    }

    async function logout() {
        await SecureStore.deleteItemAsync("token");
    }

    async function fetchUser() {
        const res = await fetch("http://192.168.1.3:3000/auth/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch user");
        }

        const userData = await res.json();

        setUser(userData);
        return userData;
    }

    return { token, user, login, logout, error, loading };
}
