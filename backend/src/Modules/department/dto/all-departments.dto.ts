import { Expose } from "class-transformer";

export class AllDepartmentsDto {
    @Expose()
    id: number

    @Expose()
    name: string

    @Expose()
    email: string

    @Expose()
    contactNo: string
}