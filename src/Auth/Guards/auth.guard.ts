import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { SUPABASE } from '../supabase.provider';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(@Inject(SUPABASE) private supabase){}

    async canActivate(context: ExecutionContext){
    
    const req = context.switchToHttp().getRequest()
    const token = req.token;

    if(!token){
        throw new UnauthorizedException("Token is not provided")
    }

    const {data:{user}, error} = await this.supabase.auth.getUser(token);

    if(error || !user){
        throw new UnauthorizedException("Invalid Token")
    }

    req.user = user

    return true
  }
}