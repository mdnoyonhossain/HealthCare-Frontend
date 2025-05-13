"use server";
import { FieldValues } from "react-hook-form";

const loginUser = async (payload: FieldValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        cache: "no-store"
    });
    const userInfo = await res.json();

    return userInfo;
}

export default loginUser;