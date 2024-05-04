import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useCodeScanner,
} from "react-native-vision-camera"; // Replace with your chosen library

import { Permission, Text, View } from "react-native";
import { useEffect } from "react";

type Props = {};

function QrCodeScanner({}: Props) {
    const device = useCameraDevice("back", {
        physicalDevices: [
            "ultra-wide-angle-camera",
            "wide-angle-camera",
            "telephoto-camera",
        ],
    });

    const codeScanner = useCodeScanner({
        codeTypes: ["qr", "ean-13"],
        onCodeScanned: (codes) => {
            console.log(codes);
        },
    });

    const { hasPermission, requestPermission } = useCameraPermission();
    // const {} = useCodeScanner();

    // useEffect(() => {
    //     const checkPermission = async () => {
    //         if (!hasPermission) return <Text>Requesting permission...</Text>;
    //         if (device == null) return <Text>Device not found</Text>;
    //     };
    //     checkPermission();
    // }, []);

    if (!hasPermission) return <Text>Requesting permission...</Text>;
    if (device == null) return <Text>Device not found</Text>;

    return (
        <Camera
            className="flex-1"
            device={device}
            codeScanner={codeScanner}
            isActive={true}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        width: 200,
                        height: 200,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: "red",
                        backgroundColor: "transparent",
                    }}
                />
                <Text style={{ fontSize: 18, marginTop: 10 }}>
                    Scan QR Code to Join
                </Text>
            </View>
        </Camera>
    );
}

export default QrCodeScanner;
