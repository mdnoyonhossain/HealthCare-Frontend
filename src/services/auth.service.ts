import { authKey } from "@/constants/authKey"
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utils/localStorage"

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
    return setToLocalStorage(authKey, accessToken);
}

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authKey);

    if (authToken) {
        const decodeData: any = decodedToken(authToken);

        return {
            ...decodeData,
            role: decodeData?.role.toLowerCase()
        }
    }
}

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
        return !!authToken;
    }
}

export const removeUser = () => {
    return removeFromLocalStorage(authKey);
}