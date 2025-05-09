export type TDoctor = {
    id: string
    name: string
    email: string
    profilePhoto?: string;
    contactNumber: string
    address: string
    registrationNumber: string
    experience: number
    gender: string
    appointmentFee: number
    qualification: string
    currentWorkingPlace: string
    designaton: string
    isDeleted: boolean
    averageRating: number
    createdAt: string
    updatedAt: string
    doctorSpecialties?: unknown[]
}