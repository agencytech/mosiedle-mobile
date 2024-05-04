import React from "react";
import { useStorageState } from "@/hooks/useStorageState";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types";
import { TokenService } from "@/tokens.service";

const AuthContext = React.createContext<{
    signIn: (
        email: string,
        password: string
    ) => Promise<User | null | undefined>;
    signOut: () => void;
    refreshTokens: (
        refreshToken: string | null | undefined
    ) => Promise<{ accessToken: any; refreshToken: any } | null>;
    session?: string | null;
    isLoading: boolean;
    setSession: (value: string | null) => void;
}>({
    signIn: (email: string, password: string) => Promise.resolve(null),
    signOut: () => null,
    refreshTokens: (refreshToken: string | null | undefined) =>
        Promise.resolve(null),
    session: null,
    isLoading: false,
    setSession: (value: string | null) => null,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error(
                "useSession must be wrapped in a <SessionProvider />"
            );
        }
    }

    return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");
    const { login, logout, token } = useAuth();

    React.useEffect(() => {
        setSession(token);
    }, [token]);

    return (
        <AuthContext.Provider
            value={{
                signIn: async (email: string, password: string) => {
                    return await login(email, password);
                },
                signOut: () => {
                    logout();
                    setSession(null);
                },
                refreshTokens: async (
                    refreshToken: string | null | undefined
                ) => {
                    if (!refreshToken) {
                        return null;
                    }

                    const newTokens = await TokenService.refreshTokens(
                        refreshToken
                    );

                    if (!newTokens.accessToken || !newTokens.refreshToken) {
                        return null;
                    }

                    setSession(newTokens.accessToken);

                    await TokenService.storeTokens(
                        newTokens.accessToken,
                        newTokens.refreshToken
                    );

                    return newTokens;
                },
                session,
                isLoading,
                setSession,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
