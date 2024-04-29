import { StackContext, StackProvider } from "@/contexts/stack.context";
import { useAuth } from "@/hooks/useAuth";
import AuthStack from "@/navigation/authStack";
import UserStack from "@/navigation/userStack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useContext, useEffect, useState } from "react";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "welcome",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <StackProvider>
            <RootLayoutNav />
        </StackProvider>
    );
}

function RootLayoutNav() {
    const { currentStack, setCurrentStack } = useContext(StackContext);
    const { token, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!authLoading) {
            setLoading(false);
            if (token) {
                setCurrentStack("UserStack");
            } else {
                setCurrentStack("AuthStack");
            }
        }
    }, [authLoading, token]);

    if (loading) {
        return null; // replace with your actual loading screen component
    }

    if (currentStack === "UserStack") {
        return <UserStack />;
    }

    return <AuthStack />;
}
