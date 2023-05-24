import { Expose, Transform } from "class-transformer";

export class AllComplaintsDto {
    @Expose()
    id: number

    @Transform(({ obj }) => (obj.user.role ? obj.user.name : undefined ))
    @Expose()
    user: string

    @Transform(({ obj }) => (obj.user.role ? undefined : obj.title))
    @Expose()
    title: string

    @Transform(({ obj }) => obj.user.role?.role === 'admin' ? obj.user?.organization?.name : obj.user?.department?.name)
    @Expose()
    belongsTo: string

    @Expose()
    description: string

    @Transform(({ obj }) => (obj.created_at))
    @Expose()
    submission_date: string

    @Expose()
    status: string
}