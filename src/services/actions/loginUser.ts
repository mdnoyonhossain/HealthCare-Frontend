import { authKey } from "@/constants/authKey";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";
import { getUserInfo } from "../auth.service";

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

    const userRoleLocalDecoded = getUserInfo();

    if (userInfo?.data?.accessToken) {
        setAccessToken(userInfo?.data?.accessToken, {
            redirect: `/dashboard/${userRoleLocalDecoded?.role}`
        });
    }

    return userInfo;
}

export default loginUser;