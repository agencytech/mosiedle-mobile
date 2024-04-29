import { createContext, useState } from "react";

export const StackContext = createContext({
    currentStack: "AuthStack",
    setCurrentStack: (stack: string) => {},
});

export function StackProvider({ children }: any) {
    const [currentStack, setCurrentStack] = useState("AuthStack");

    return (
        <StackContext.Provider value={{ currentStack, setCurrentStack }}>
            {children}
        </StackContext.Provider>
    );
}
