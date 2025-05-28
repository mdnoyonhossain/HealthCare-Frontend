import { USER_ROLE } from "@/constants/role";

export type TMeta = {
    page: number;
    limit: number;
    total: number;
}

export type TUserRole = keyof typeof USER_ROLE;

export type TResponseSuccessData = {
    data: any;
    meta?: TMeta;
};

export type TGenericErrorMessage = {
    path: string | number;
    message: string;
};

export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: TGenericErrorMessage[];
};

export const genderItems = ["MALE", "FEMALE"];