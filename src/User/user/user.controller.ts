import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/Auth/Guards/auth.guard';
import { SUPABASE } from 'src/Auth/supabase.provider';

@Controller('user')
export class UserController {
    constructor(@Inject(SUPABASE) private supabase){}

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Req() req){

        return {
            id: req.user.id,
            email: req.user.email,
            createdAt: req.user.created_at
        }
    }
}
