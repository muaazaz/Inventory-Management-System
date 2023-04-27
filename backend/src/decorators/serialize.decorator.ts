import { UseInterceptors } from "@nestjs/common";
import { SerializeInterceptor } from "src/Interceptors/serialize.interceptor";

//To allow any type of class and class only
interface ClassConstructor{
    new(...args: any[]): {}
}

export function Serialize(dto: ClassConstructor){
    return UseInterceptors(new SerializeInterceptor(dto))
}