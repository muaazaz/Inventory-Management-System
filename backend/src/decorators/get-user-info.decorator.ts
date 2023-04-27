import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserDecorator = createParamDecorator(
    (data: any, context: ExecutionContext)=>{
        const {user} = context.switchToHttp().getRequest()
        return user
    }
)