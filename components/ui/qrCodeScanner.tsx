import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera/next";
import { useCommunity } from "@/hooks/useCommunity";

type Props = {
    setModalVisible: (isVisible: boolean) => void;
    setCameraVisible: (isVisible: boolean) => void;
};

export default function QrCodeScanner({
    setModalVisible,
    setCameraVisible,
}: Props) {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);

    const { joinCommunity } = useCommunity();

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
    }, []);

    const handleBarCodeScanned = async ({
        type,
        data,
    }: {
        type: any;
        data: any;
    }) => {
        setScanned(true);
        if (type === 256) {
            // write a regex that checks if the data is a valid community code (6 characters, alphanumeric with no special characters)
            // if it is, call joinCommunity(data)
            // else, show an error message

            const regex = /^[A-Za-z0-9]{8}$/;

            if (regex.test(data)) {
                await joinCommunity(data);
                alert("Dołączono do mOsiedla z kodem: " + data);
                setModalVisible(false);
                setCameraVisible(false);
            } else {
                alert(
                    "Nieprawidłowy kod mOsiedla. Spróbuj ponownie. (" +
                        data +
                        ")"
                );
            }
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View className="flex flex-col items-center justify-center flex-1 w-full">
            <CameraView
                onBarcodeScanned={async (result) =>
                    scanned ? undefined : await handleBarCodeScanned(result)
                }
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                style={StyleSheet.absoluteFillObject}
                className="relative"
            />
            {scanned && (
                <TouchableOpacity
                    onPress={() => setScanned(false)}
                    className="absolute flex flex-col items-center justify-center w-11/12 p-4 my-2 bg-primary rounded-xl bottom-12"
                >
                    <Text className="text-white">Tap to Scan Again</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
