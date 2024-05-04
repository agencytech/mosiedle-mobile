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
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "@/contexts/session";

const logo = require("../assets/images/logo.png");

type Props = {};

interface FormData {
    fullName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export default function Register({}: Props) {
    const steps = [
        {
            title: "Dane podstawowe",
            description: "Podaj swoje imię i nazwisko, oraz adres e-mail.",
            fields: [
                {
                    label: "Imię i Nazwisko",
                    name: "fullName",
                    placeholder: "Jan Kowalski",
                    type: "name",
                    required: true,
                },
                {
                    label: "Adres e-mail",
                    name: "email",
                    placeholder: "jan.kowalski@gmail.com",
                    type: "emailAddress",
                    required: true,
                },
            ],
        },
        {
            title: "Utwórz hasło",
            description: "Podaj hasło, które będzie używane do logowania.",
            fields: [
                {
                    label: "Hasło",
                    name: "password",
                    placeholder: "********",
                    type: "password",
                    required: true,
                },
                {
                    label: "Powtórz hasło",
                    name: "passwordConfirm",
                    placeholder: "********",
                    type: "password",
                    required: true,
                },
            ],
        },
    ] as any;
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });
    const { register } = useAuth();
    const { signIn } = useSession();

    async function handleRegister() {
        if (formData.password === formData.passwordConfirm) {
            const isRegistered = await register(
                formData.email,
                formData.password,
                formData.fullName
            );

            if (isRegistered) {
                const user = await signIn(formData.email, formData.password);

                if (user) {
                    setFormData({
                        fullName: "",
                        email: "",
                        password: "",
                        passwordConfirm: "",
                    });
                    router.replace("/(tabs)");
                } else {
                    console.error("Failed to log in front");
                }
            } else {
                console.error("Failed to register front");
            }
        } else {
            console.error("Passwords do not match");
        }
    }

    function canProceed() {
        // based on the current step, check if the formData properties required in the current step are filled
        const requiredFields = steps[currentStep].fields.filter(
            (field: { name: keyof FormData; required: boolean }) =>
                field.required
        );

        for (let field of requiredFields) {
            if (formData[field.name as keyof FormData] === "") {
                return false;
            }
        }

        return true;
    }

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
            <View className="flex items-center justify-center w-full gap-6 mt-4">
                <View className="flex flex-col items-start justify-start w-full p-5">
                    <Text className="text-3xl font-bold text-primary">
                        {steps[currentStep].title}
                    </Text>
                    <Text className="text-neutral-500 ">
                        {steps[currentStep].description}
                    </Text>
                </View>
                <View className="flex flex-col items-start justify-start w-full px-5 gap-y-5">
                    {steps[currentStep].fields.map(
                        (field: any, index: number) => (
                            <View
                                key={index}
                                className="flex flex-col items-start justify-start w-full gap-2"
                            >
                                <Text className="text-neutral-500">
                                    {field.label}
                                </Text>
                                <TextInput
                                    value={
                                        formData[field.name as keyof FormData]
                                    }
                                    onChangeText={(text) =>
                                        setFormData({
                                            ...formData,
                                            [field.name]: text,
                                        })
                                    }
                                    textContentType={field.type}
                                    placeholder={field.placeholder}
                                    className="w-full px-4 py-2 border-2 border-neutral-300 rounded-xl"
                                />
                            </View>
                        )
                    )}
                </View>
                <View className="flex flex-row items-center justify-between w-full p-5">
                    <TouchableOpacity
                        className={`${
                            currentStep === 0
                                ? "bg-transparent text-transparent pointer-events-none"
                                : "flex items-center justify-center w-1/3 py-1.5 border-2 border-primary rounded-xl bg-primary"
                        }`}
                        onPress={() => {
                            if (currentStep > 0) {
                                setCurrentStep(currentStep - 1);
                            }
                        }}
                    >
                        <Text
                            className={`${
                                currentStep === 0
                                    ? "text-transparent"
                                    : "text-xl text-white"
                            }`}
                        >
                            Wstecz
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="flex items-center justify-center w-1/3 py-1.5 border-2 border-primary rounded-xl bg-primary"
                        onPress={async () => {
                            // each time the user clicks the button:
                            // 1. check if the fields are filled
                            // 2. if they are, check if the current step is the last one
                            // 3. if it is, submit the form
                            // 4. if it's not, move to the next step
                            if (canProceed()) {
                                if (currentStep === steps.length - 1) {
                                    await handleRegister();
                                } else {
                                    setCurrentStep(currentStep + 1);
                                }
                            }
                        }}
                    >
                        <Text className="text-xl text-white">
                            {currentStep === steps.length - 1
                                ? "Zarejestruj się"
                                : "Dalej"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* //!! FORM */}
            <StatusBar barStyle={"dark-content"} />
        </View>
    );
}
