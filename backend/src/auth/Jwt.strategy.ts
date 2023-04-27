import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'thisismysecretformyapplication'
        })
    }
    async validate(payload: any){
        return({
            id: payload.id,
            name: payload.name,
            email: payload.email,
            organizationId: payload.organizationId,
            role: payload.role
        })
    }
}