import React from "react";
import { Redirect, Tabs } from "expo-router";
import { NewspaperIcon, SettingsIcon } from "lucide-react-native";
import { useSession } from "@/contexts/session";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function TabLayout() {
    const { session, isLoading } = useSession();

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/welcome" />;
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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
        </GestureHandlerRootView>
    );
}
