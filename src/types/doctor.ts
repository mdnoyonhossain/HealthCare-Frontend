export type TDoctor = {
    id: string;
    email: string;
    name: string;
    profilePhoto: string;
    contactNumber: string;
    address: string;
    registrationNumber: string;
    experience: number;
    gender: 'MALE' | 'FEMALE';
    appointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designaton: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    averageRating: number;
    review: any[];
    doctorSpecialties: TDoctorSpecialty[];
}

export type TDoctorSpecialty = {
    specialtiesId: string;
    doctorId: string;
    specialties: any;
}

export type TSpecialties = {
    specialtiesId: string;
    isDeleted?: null;
}

export type TDoctorFormData = {
    doctor: TDoctor;
    password: string;
}