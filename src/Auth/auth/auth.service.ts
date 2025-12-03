import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SUPABASE } from '../supabase.provider';
import { RegisterResponseDTO } from '../DTOs/registerResponse.dto';
import { LoginResponseDTO } from '../DTOs/loginResponse.dto';
import { RefreshResponseDto } from '../DTOs/refreshRes.dto';

@Injectable()
export class AuthService {
    constructor(@Inject(SUPABASE) private supabase) { }

    //Register User
    async registerUser(email: string, password: string): Promise<RegisterResponseDTO> {

        const { data, error } = await this.supabase.auth.signUp({ email, password })

        if (error) {
            throw new UnauthorizedException(error.message)
        }

        return {
            userId: data.user.id,
            email: data.user.email,
            createdAt: data.user.created_at,
        };
    }

    //Login User
    async loginUser(email: string, password: string): Promise<LoginResponseDTO> {

        const { data, error } = await this.supabase.auth.signInWithPassword({ email, password })

        if (error) {
            throw new UnauthorizedException(error.message)
        }

        return {
            userId: data.user.id,
            email: data.user.email,
            accessToke: data.session.access_token,
            refreshToken: data.session.refresh_token
        }
    }

    async getNewAccessToken(refreshToken: string): Promise<RefreshResponseDto> {

        const { data, error } = await this.supabase.auth.refreshSession({ refresh_token: refreshToken });

        if (error || !data.session) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }

        return {
            accessToken: data.session.access_token,
            expiresAt: data.session.expires_at?.toString() || '',
        };
    }

}
