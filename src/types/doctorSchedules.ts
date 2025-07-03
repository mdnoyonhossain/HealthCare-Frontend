import { TDoctor } from "./doctor";

export type TDoctorSchedule = {
    doctorId: string;
    scheduleId: string;
    isBooked: boolean;
    createdAt: string;
    updatedAt: string;
    appointmentId: string | null;
    doctor: TDoctor;
    schedule: Schedule;
}

export type Schedule = {
    id: string;
    startDateTime: string;
    endDateTime: string;
    createdAt: string;
    updatedAt: string;
}