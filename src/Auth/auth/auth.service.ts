import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SUPABASE } from '../supabase.provider';

@Injectable()
export class AuthService {
    constructor(@Inject(SUPABASE) private supabase){}

    //Register User
    async registerUser(email: string, password: string){

        const {data, error} = await this.supabase.auth.signUp({email, password})

        if(error){
            throw new UnauthorizedException(error.message)
        }

        return data
    }

    //Login User
    async loginUser(email: string, password: string){

        const {data, error} = await this.supabase.auth.signInWithPassword({email, password})

        if(error){
            throw new UnauthorizedException(error.message)
        }

        return data
    }

    //get the porfile of the logedIn user

    async getProfileInfo(token: string){

        const {data:{user}, error} = await this.supabase.auth.getUser(token);

        
    }
}
