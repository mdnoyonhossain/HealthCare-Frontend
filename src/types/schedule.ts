import { TMeta } from "./common";

export type TSchedule = {
    [x: string]: any;
    id?: string;
    startDate: string;
    endDate: string;
};

export type TScheduleFrom = {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
};

export type TGetSchedule = {
    createdAt: string;
    endDateTime: string;
    id: string;
    startDateTime: string;
    updatedAt: string;
}

export type TGetAllSchedulesResponse = {
    schedules: {
        data: TGetSchedule[];
    };
    meta?: TMeta;
};