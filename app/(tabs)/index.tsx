import { Text, View } from "react-native";
import { useAuth } from "@/hooks/useAuth";

export default function HomeScreen() {
    const { user } = useAuth();
    return (
        <View className="flex items-center justify-center flex-1 bg-white">
            <Text className="text-3xl font-bold">Hello, {user?.email}</Text>
        </View>
    );
}
