import useRedirect from "@/features/shared/hooks/useRedirect";
import { AuthStore } from "../store/Auth";
import { useEffect, useState } from "react";


const useAuthMount = () => {
    const { redirectToAuthenticate } = useRedirect();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        console.log("Setting up auth mount...", "Current access token:", AuthStore.getState().access_token);
        const unsub = AuthStore.persist.onFinishHydration(() => {
        const token = AuthStore.getState().access_token;
        console.log("Auth hydration finished. Access token:", token);
        if (token) {
            setIsMounted(true);
        } else {
            redirectToAuthenticate(true);
        }
    });

    return () => unsub();
    }, [redirectToAuthenticate]);

    return {
        isMounted,
    };
};

export default useAuthMount;