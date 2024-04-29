import { Text, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useContext, useEffect } from "react";
import { StackContext } from "@/contexts/stack.context";
import { router } from "expo-router";

export default function HomeScreen() {
    const { setCurrentStack } = useContext(StackContext);
    const { token, user } = useAuth();

    useEffect(() => {
        if (!token) {
            setCurrentStack("AuthStack");
            router.replace("/welcome");
        }
    }, [token]);

    return (
        <View className="flex items-center justify-center flex-1 bg-white">
            <Text className="text-3xl font-bold">Hello, {user?.email}</Text>
        </View>
    );
}
