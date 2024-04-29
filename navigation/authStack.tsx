import { StackContext } from "@/contexts/stack.context";
import { useAuth } from "@/hooks/useAuth";
import { Stack } from "expo-router";
import React, { useContext, useEffect } from "react";
import { router } from "expo-router";

type Props = {};

export default function AuthStack({}: Props) {
    const { setCurrentStack } = useContext(StackContext);
    const { token } = useAuth();

    useEffect(() => {
        if (!token) {
            setCurrentStack("AuthStack");
            router.replace("/welcome");
        }
    }, [token]);

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                statusBarStyle: "light",
                statusBarColor: "#FD5959",
            }}
        >
            <Stack.Screen name="welcome" />
            <Stack.Screen
                name="login"
                options={{
                    statusBarStyle: "dark",
                    statusBarColor: "#FFFFFF",
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    statusBarStyle: "dark",
                    statusBarColor: "#FFFFFF",
                }}
            />
        </Stack>
    );
}
