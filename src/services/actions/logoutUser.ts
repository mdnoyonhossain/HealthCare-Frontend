import { authKey } from "@/constants/authKey";
import { deleteCookies } from "./deleteCookies";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const logoutUser = (navigate: AppRouterInstance) => {
    localStorage.removeItem(authKey);
    deleteCookies([authKey, 'refreshToken']);
    navigate.refresh();
    navigate.push('/login');
};

export default logoutUser;