import { Stack } from "expo-router";
import React from "react";

type Props = {};

export default function AuthStack({}: Props) {
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
