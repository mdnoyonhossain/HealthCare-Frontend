import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";
import { jwtDecode } from "jwt-decode";

const loginUser = async (payload: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        credentials: "include"
    });
    const userInfo = await res.json();

    const passwordChangeRequired = userInfo?.data?.needPasswordChange;
    let decodeData = userInfo?.data?.accessToken;

    if (decodeData) {
        decodeData = jwtDecode(decodeData) as any;
    }

    const userRole = decodeData?.role?.toLowerCase();

    if (userInfo?.data?.accessToken) {
        setAccessToken(userInfo?.data?.accessToken, {
            redirect: `/dashboard/${userRole}`,
            passwordChangeRequired,
            userRole
        });
    }

    return userInfo;
}

export default loginUser;