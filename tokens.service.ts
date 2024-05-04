import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSession } from "./contexts/session";

export class TokenService {
    constructor() {}

    static async storeTokens(accessToken: string, refreshToken: string) {
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
    }

    static async getTokens() {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        return { accessToken, refreshToken };
    }

    static async refreshTokens(refreshToken: string) {
        // refresh the token using axois and return the new tokens
        const res = await axios.post(
            "/auth/refresh",
            {},
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            }
        );

        console.log("Refreshed tokens", res.data);

        return {
            accessToken: res.data.access_token,
            refreshToken: res.data.refresh_token,
        };
    }

    static async clearTokens() {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
    }
}
