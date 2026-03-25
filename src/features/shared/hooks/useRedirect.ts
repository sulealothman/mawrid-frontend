import { AuthStore } from "@/features/authenticate/store/Auth";
import { Url } from "next/dist/shared/lib/router/router";
import { useRouter } from "next/router";


const useRedirect = () => {

    const access_token = AuthStore(state => state.access_token);
    const router = useRouter();
    const { query, isReady, pathname } = router;

    const redirectTo = (url: Url, as?: Url, options?: Parameters<typeof router.push>[2]) => {
        router.push(url, as, options);
    };

    const redirectToAuthenticate = (withCheck?: boolean) => {
        if (withCheck) {
            if (!access_token) {
                redirectTo("/authenticate");
            }
            return;
        }
        redirectTo("/authenticate");
    };

    const redirectToIndex = () => {
        if (access_token) {
            redirectTo("/");
        } else {
            redirectTo("/authenticate");
        }
    }

    const redirectToHome = () => {
        if (access_token) {
            redirectTo("/home");
        } else {
            redirectTo("/authenticate");
        }
    }

    const redirectToProfile = () => {
        if (access_token) {
            redirectTo("/profile");
        } else {
            redirectTo("/authenticate");
        }
    }

    const redirectToKnowledgeBase = (knowledgeBaseId: string, withCheck = true) => {
        if(!withCheck) {
            redirectTo(`/kb/${knowledgeBaseId}`);
            return;
        }
        if (access_token) {
            redirectTo(`/kb/${knowledgeBaseId}`);
        } else {
            redirectTo("/authenticate");
        }
    };

    const redirectToKnowledgeBaseIndex = (withCheck = true) => {
        if(!withCheck) {
            // redirectTo("/kb");
            redirectTo("/home");
            return;
        }
        if (access_token) {
            // redirectTo("/kb");
            redirectTo("/home");
        } else {
            redirectTo("/authenticate");
        }
    }

    const redirectToNewChat = (withCheck = true) => {
        if(!withCheck) {
            redirectTo("/c");
            return;
        }
        if (access_token) {
            redirectTo("/c");
        } else {
            redirectTo("/authenticate");
        }
    }

    const redirectToChat = (chatId: string, withCheck = true) => {
        if(!withCheck) {
            redirectTo(`/c/${chatId}`);
            return;
        }
        if (access_token) {
            redirectTo(`/c/${chatId}`);
        } else {
            redirectTo("/authenticate");
        }
    }

    return {
        query,
        isReady,
        pathname,
        redirectTo,
        redirectToIndex,
        redirectToAuthenticate,
        redirectToHome,
        redirectToProfile,
        redirectToKnowledgeBase,
        redirectToKnowledgeBaseIndex,
        redirectToNewChat,
        redirectToChat,
    }; 

}

export default useRedirect;