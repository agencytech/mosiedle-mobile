import { Announcement } from "@/types";
import { XIcon } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Dialog, PanningProvider, Text } from "react-native-ui-lib";

type Props = {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
    announcement: Announcement;
};

function AnnouncementModal({ isVisible, setIsVisible, announcement }: Props) {
    return (
        <View
            style={{
                position: "absolute",
                justifyContent: "center",
                flex: 1,
                display: isVisible ? "flex" : "none",
            }}
        >
            <Dialog
                visible={isVisible}
                onDismiss={() => setIsVisible(false)}
                panDirection={PanningProvider.Directions.DOWN}
                containerStyle={{
                    borderRadius: 15,
                    backgroundColor: "white",
                }}
                overlayBackgroundColor="rgba(0, 0, 0, 0.5)"
                pannableHeaderProps={{
                    title: announcement.title,
                    icon: announcement.icon,
                    onPress: () => setIsVisible(false),
                }}
                height={500}
                renderPannableHeader={(props) => (
                    <View className="flex flex-row items-center justify-between p-4 bg-neutral-100">
                        <Text className="text-xl font-medium">
                            {props.icon}{" "}
                            {props.title && props.title.length > 30
                                ? props.title.slice(0, 30) + "..."
                                : props.title}
                        </Text>
                        <TouchableOpacity onPress={props.onPress}>
                            <XIcon size={24} color={"#212121"} />
                        </TouchableOpacity>
                    </View>
                )}
            >
                <View className="flex flex-col items-center justify-center p-4">
                    <Text className="w-full mb-4 capitalize text-start text-neutral-500">
                        <Text className="text-black" style={{ fontSize: 16 }}>
                            {announcement.author?.fullName},{" "}
                        </Text>
                        {new Date(announcement.created_at).toLocaleDateString(
                            "pl-PL",
                            {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                    </Text>
                    <Text className="w-full text-lg text-neutral-700 text-start">
                        {announcement.text}
                    </Text>
                </View>
            </Dialog>
        </View>
    );
}

export default AnnouncementModal;
