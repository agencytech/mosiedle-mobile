import React from "react";
import { Tabs } from "expo-router";
import { NewspaperIcon, SettingsIcon } from "lucide-react-native";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#FD5959",
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    borderTopColor: "transparent",
                    shadowColor: "transparent",
                    backgroundColor: "#f5f5f5",
                },
                tabBarLabelStyle: {
                    display: "none",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <NewspaperIcon size={32} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Tab Two",
                    tabBarIcon: ({ color }) => (
                        <SettingsIcon size={32} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
