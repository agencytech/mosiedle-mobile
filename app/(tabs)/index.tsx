import {
    FlatList,
    RefreshControl,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useCommunity } from "@/hooks/useCommunity";
import { Announcement, Community } from "@/types";
import { useEffect, useState } from "react";
import { Picker } from "react-native-ui-lib";
import { Modal } from "react-native-ui-lib";
import { ChevronDownIcon } from "lucide-react-native";
import JoinCommunityModal from "@/components/ui/modal";
import AnnouncementModal from "@/components/ui/announcementModal";

function getCommunityById(communities: Community[], id: string) {
    return communities.find((c) => c.id === id) || null;
}

export default function HomeScreen() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnnouncementVisible, setIsAnnouncementVisible] = useState(false);
    const [announcement, setAnnouncement] = useState({} as Announcement);

    const { user, fetchProfile } = useAuth();

    useEffect(() => {
        !user && fetchProfile();
    }, [user]); // Fetch user data on component mount and potential updates

    const { communities, error, loading, fetchCommunities } = useCommunity();

    const selectedCommunityId = communities?.[0]?.id || ""; // Use optional chaining

    const [selectedCommunityData, setSelectedCommunityData] =
        useState<Community | null>(null);

    useEffect(() => {
        if (!communities) return; // Skip if communities haven't been fetched yet

        const selectedId = selectedCommunityId || communities[0]?.id || ""; // Use optional chaining
        const data = getCommunityById(communities, selectedId);
        setSelectedCommunityData(data);
    }, [communities, selectedCommunityId]);

    return (
        <View className="flex flex-col items-center justify-start flex-1 pt-12 bg-white">
            <AnnouncementModal
                isVisible={isAnnouncementVisible}
                setIsVisible={setIsAnnouncementVisible}
                announcement={announcement}
            />
            <View className="flex flex-row items-center justify-between w-full p-4 bg-neutral-100">
                {selectedCommunityData ? (
                    <>
                        <Text className="text-xl font-semibold">
                            {selectedCommunityData?.name.length > 20
                                ? selectedCommunityData?.name.slice(0, 20) +
                                  "..."
                                : selectedCommunityData?.name}
                        </Text>
                        <Picker
                            label="Wheel Picker"
                            placeholder="Pick a Language"
                            useWheelPicker
                            value={selectedCommunityId} // Use selectedCommunityId
                            onChange={(nativePickerValue) => {
                                const data = getCommunityById(
                                    communities,
                                    nativePickerValue as string
                                );
                                setSelectedCommunityData(data);
                            }}
                            trailingAccessory={<ChevronDownIcon size={24} />}
                            renderPicker={() => {
                                return (
                                    <View className="flex items-center justify-center px-4 py-1 bg-primary rounded-xl">
                                        <Text className="text-lg text-neutral-50">
                                            Wybierz mOsiedle
                                        </Text>
                                    </View>
                                );
                            }}
                        >
                            {communities.map((community) => (
                                <Picker.Item
                                    key={community.id}
                                    value={community.id}
                                    label={community.name}
                                />
                            ))}
                        </Picker>
                    </>
                ) : (
                    <Text className="text-xl font-semibold">Brak mOsiedli</Text>
                )}
            </View>
            <FlatList
                data={selectedCommunityData?.announcements || []}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                            setAnnouncement(item);
                            setIsAnnouncementVisible(true);
                        }}
                        className="flex flex-row items-center justify-center w-11/12 p-4 pt-3 mx-auto my-2 bg-neutral-200 rounded-xl"
                    >
                        <Text className="pt-1 pr-5 text-4xl text-center text-neutral-800">
                            {item.icon}
                        </Text>
                        <View className="flex flex-col items-start justify-start flex-1 w-full">
                            <Text className="text-lg font-bold">
                                {item.title}
                            </Text>
                            <Text className="text-sm text-neutral-700">
                                {item.text.length > 100
                                    ? item.text.slice(0, 100) + "..."
                                    : item.text}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => (
                    <View className="w-full h-1 bg-white" />
                )}
                refreshControl={
                    <RefreshControl
                        //refresh control used for the Pull to Refresh
                        refreshing={loading}
                        onRefresh={async () => {
                            await fetchProfile();
                            await fetchCommunities();
                        }}
                    />
                }
                className={`flex flex-col flex-1 h-full w-full py-6`}
            />
            {/* {!selectedCommunityData && ( */}
            <TouchableOpacity
                className="flex flex-col items-center justify-center w-11/12 p-4 my-3 bg-primary rounded-xl"
                onPress={() => {
                    setIsVisible(true);
                }}
            >
                <Text className="text-lg font-bold text-white">
                    Dołącz do mOsiedla
                </Text>
            </TouchableOpacity>
            {/* )} */}
            <JoinCommunityModal
                isVisible={isVisible}
                setIsVisible={setIsVisible}
            />
            <StatusBar
                backgroundColor={isVisible ? "#fff" : "#f5f5f5"}
                barStyle="dark-content"
            />
        </View>
    );
}
