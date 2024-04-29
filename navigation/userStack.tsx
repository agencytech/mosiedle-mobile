import { Stack } from "expo-router";
import React from "react";

type Props = {};

export default function UserStack({}: Props) {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                statusBarStyle: "dark",
            }}
        >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
        </Stack>
    );
}