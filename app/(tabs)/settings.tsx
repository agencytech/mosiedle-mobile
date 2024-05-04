import { Text, View } from "@/components/Themed";
import { TouchableOpacity } from "react-native";
import { useSession } from "@/contexts/session";
import { router } from "expo-router";

export default function SettingsScreen() {
    const { signOut } = useSession();
    return (
        <View className="flex items-center justify-center flex-1 bg-white">
            <TouchableOpacity
                onPress={() => {
                    signOut();
                    router.replace("/welcome");
                }}
            >
                <Text className="text-xl font-medium text-black">
                    Wyloguj się
                </Text>
            </TouchableOpacity>
        </View>
    );
}
