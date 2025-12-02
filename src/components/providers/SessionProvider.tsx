import {createContext, type ReactNode, useContext, useState} from "react";
import type {CalculatorInputParameters} from "@/hooks/types.tsx";

interface SessionContextValue {
    inputParameters?: CalculatorInputParameters;
    setInputParameters: (inputParameters?: CalculatorInputParameters) => void;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export const useSession = () => {
    const ctx = useContext(SessionContext);
    if(!ctx) throw new Error("useSession must be used inside <SessionProvider>");
    return ctx;
};

export default function SessionProvider({ children } : { children?: ReactNode }) {
    const [inputParameters, setInputParameters] = useState<CalculatorInputParameters | undefined>(undefined);

    return (
        <SessionContext.Provider value={{inputParameters, setInputParameters}}>
            {children}
        </SessionContext.Provider>
    );
};