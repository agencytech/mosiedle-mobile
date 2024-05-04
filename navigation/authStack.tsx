import { Redirect, Stack } from "expo-router";
import { useSession } from "@/contexts/session";
import { Text } from "react-native";

type Props = {};

export default function AuthStack({}: Props) {
    const { session, isLoading } = useSession();

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/" />;
    }

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
