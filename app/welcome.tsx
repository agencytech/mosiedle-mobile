import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Link } from "expo-router";

type Props = {};

const icon = require("../assets/images/icon.svg");

export default function WelcomeScreen({}: Props) {
    return (
        <View className="flex items-center flex-1 justify-evenly bg-primary">
            <View className="flex flex-col items-center justify-center gap-12">
                <Image source={icon} className="w-1/2 h-auto aspect-square" />
                <View className="flex items-center justify-center w-full mt-4 text-center">
                    <Text className="text-5xl font-bold text-white">
                        mOsiedle
                    </Text>
                    <Text className="text-lg text-white">
                        Dołącz do swojego wirtualnego osiedla już dziś!
                    </Text>
                </View>
            </View>
            <View className="flex items-center justify-center w-full gap-6 mt-4">
                <Link href="/login" asChild>
                    <TouchableOpacity className="flex items-center justify-center w-5/6 py-2 border-2 border-white rounded-xl bg-primary">
                        <Text className="text-xl font-medium text-white">
                            Zaloguj się
                        </Text>
                    </TouchableOpacity>
                </Link>
                <Link href="/register" asChild>
                    <TouchableOpacity className="flex items-center justify-center w-5/6 py-2 bg-white border-2 border-white rounded-xl">
                        <Text className="text-xl font-medium text-primary">
                            Utwórz konto i dołącz do osiedla
                        </Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}
