import useUserActions from "@/features/users/hooks/useUserActions";
import { UserStore } from "@/features/users/store/User";

const useSidebar = () => {

    const user = UserStore((state) => state);
    const { updatePreferences } = useUserActions();

    const handleClose = () => {
        updatePreferences({ sidebar_collapse: !user.preferences?.sidebar_collapse });
    }

    return {
        isCollapse : user.preferences?.sidebar_collapse ?? false,
        handleClose
    };
}

export default useSidebar;