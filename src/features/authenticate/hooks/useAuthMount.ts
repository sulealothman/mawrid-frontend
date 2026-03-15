import useRedirect from "@/features/shared/hooks/useRedirect";
import { AuthStore } from "../store/Auth";
import { useEffect, useState } from "react";


const useAuthMount = () => {
    const { redirectToAuthenticate } = useRedirect();

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (isMounted) return;
        const checkAuth = () => {
            const token = AuthStore.getState().access_token;

            if (token) {
                setIsMounted(true);
            } else {
                redirectToAuthenticate(true);
            }
        };

        if (AuthStore.persist.hasHydrated()) {
            checkAuth();
            return;
        }

        const unsub = AuthStore.persist.onFinishHydration(() => {
            checkAuth();
        });

        return () => unsub();
    }, [isMounted, redirectToAuthenticate]);

    return {
        isMounted,
    };
};

export default useAuthMount;