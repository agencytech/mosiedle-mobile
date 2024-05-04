import { useState } from "react";
import {
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Image } from "expo-image";
// import { ChevronLeftIcon } from "lucide-react-native";
import { Link, router } from "expo-router";
import { useSession } from "@/contexts/session";

const logo = require("../assets/images/logo.png");

type Props = {};

export default function Login({}: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signIn } = useSession();

    const handleLogin = async () => {
        const user = await signIn(email, password);

        if (user) {
            setEmail("");
            setPassword("");

            router.replace("/(tabs)");
        } else {
            console.error("Failed to log in front", user);
            alert("Nie udało się zalogować. Spróbuj ponownie. " + user);
        }
    };

    return (
        <View className="flex items-center justify-start flex-1 pt-12 bg-white">
            {/* //!! HEADER */}
            <View className="flex flex-row items-start justify-between w-full p-5">
                <Link href="/welcome" asChild>
                    <TouchableOpacity className="flex flex-row items-center justify-center">
                        {/* <ChevronLeftIcon
                            size={32}
                            className="w-12 h-12 text-primary"
                        /> */}
                        <Text className="font-medium text-primary">
                            Strona główna
                        </Text>
                    </TouchableOpacity>
                </Link>
                <Image
                    source={logo}
                    className="w-32 h-auto aspect-[121/30] mr-3"
                />
            </View>
            {/* //!! HEADER */}

            {/* //!! FORM */}
            <View className="flex items-center justify-center flex-1 w-full">
                <View className="flex items-center justify-center w-full gap-12 text-center">
                    <Text className="text-4xl font-bold text-primary">
                        Zaloguj się
                    </Text>
                    <View className="flex flex-col items-center justify-center w-full gap-4">
                        <TextInput
                            onChange={(e) => {
                                setEmail(e.nativeEvent.text);
                            }}
                            placeholder="Adres e-mail"
                            textContentType="emailAddress"
                            className="w-5/6 px-4 py-2 border-2 border-gray-300 caret-primary text-md rounded-xl"
                        />
                        <TextInput
                            onChange={(e) => {
                                setPassword(e.nativeEvent.text);
                            }}
                            placeholder="Hasło"
                            textContentType="password"
                            className="w-5/6 px-4 py-2 border-2 border-gray-300 caret-primary text-md rounded-xl"
                        />
                        <TouchableOpacity
                            onPress={async () => {
                                await handleLogin();
                            }}
                            className="flex items-center justify-center w-5/6 py-2 border-2 border-primary rounded-xl bg-primary"
                        >
                            <Text className="text-xl font-medium text-white">
                                Zaloguj się
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* //!! FORM */}
            <StatusBar barStyle={"dark-content"} />
        </View>
    );
}
