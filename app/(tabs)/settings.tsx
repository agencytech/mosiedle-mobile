import { useAuth } from "@/hooks/useAuth";
import { Text, View } from "@/components/Themed";
import { TouchableOpacity } from "react-native";

export default function SettingsScreen() {
    const { logout } = useAuth();
    return (
        <View className="flex items-center justify-center flex-1 bg-white">
            <TouchableOpacity
                onPress={() => {
                    logout();
                }}
            >
                <Text className="text-xl font-medium text-black">
                    Wyloguj się
                </Text>
            </TouchableOpacity>
        </View>
    );
}
