import useRedirect from "@/features/shared/hooks/useRedirect";
import { AuthStore } from "../store/Auth";
import { useEffect, useState } from "react";

const useUnauthMount = () => {
    const { redirectToHome } = useRedirect();
    const access_token = AuthStore(state => state.access_token);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (access_token) {
            redirectToHome();
        } else {
            setIsMounted(true);
        }
    }, [access_token, redirectToHome]);

    return {
        isMounted,
    };
};

export default useUnauthMount;
