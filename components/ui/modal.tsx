import { useCommunity } from "@/hooks/useCommunity";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Modal } from "react-native-ui-lib";
import QrCodeScanner from "@/components/ui/qrCodeScanner";

type Props = {
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
};

function JoinCommunityModal({ isVisible, setIsVisible }: Props) {
    const [code, setCode] = useState("");

    const { joinCommunity, fetchCommunities, error } = useCommunity();

    const [codeScannerOpen, setCodeScannerOpen] = useState(false);

    return (
        <Modal
            visible={isVisible}
            hardwareAccelerated
            presentationStyle="formSheet"
            onBackgroundPress={() => {
                setIsVisible(false);
                setCodeScannerOpen(false);
            }}
            animationType="slide"
        >
            <Modal.TopBar
                title="Dołącz do mOsiedla"
                onCancel={() => {
                    // setIsVisible(false);
                    // setCodeScannerOpen(false);
                    // if codescanner is open, close it
                    // if its not close the modal
                    if (codeScannerOpen) {
                        setCodeScannerOpen(false);
                    } else {
                        setIsVisible(false);
                    }
                }}
                titleStyle={{ fontWeight: "bold", fontSize: 20 }}
            />
            {codeScannerOpen ? (
                <QrCodeScanner
                    setModalVisible={setIsVisible}
                    setCameraVisible={setCodeScannerOpen}
                />
            ) : (
                <View className="flex flex-col items-center justify-between flex-1 w-full p-4 bg-neutral-100">
                    <View className="flex flex-col items-center justify-center flex-1 w-full">
                        <Text
                            style={{ fontSize: 15 }}
                            className="w-full mb-2 text-start text-neutral-500"
                        >
                            Wpisz kod mOsiedla, który otrzymałeś od zarządcy.
                        </Text>
                        <View className="flex flex-row items-center justify-between w-full p-4 bg-neutral-200 rounded-xl">
                            <Text className="text-lg font-bold">
                                Kod mOsiedla
                            </Text>
                            <TextInput
                                onChangeText={(text) => setCode(text)}
                                className="w-24 text-lg text-center"
                                placeholder="_ _ _ _ _ _"
                            />
                        </View>
                        {/* add a text to scan a qr code instead */}
                        <TouchableOpacity
                            onPress={() => setCodeScannerOpen(true)}
                            className="flex flex-row items-center self-end justify-center mt-4"
                        >
                            <Text className="text-neutral-500">
                                Albo zeskanuj kod QR
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        className="flex flex-col items-center justify-center w-11/12 p-4 my-2 bg-primary rounded-xl"
                        onPress={async () => {
                            const joined = await joinCommunity(code);
                            if (joined) {
                                await fetchCommunities();
                                setIsVisible(false);
                                setCodeScannerOpen(false);
                            } else {
                                alert(error);
                            }
                        }}
                    >
                        <Text className="text-lg font-bold text-white">
                            Dołącz
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </Modal>
    );
}

export default JoinCommunityModal;
