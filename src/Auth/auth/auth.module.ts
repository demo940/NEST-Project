import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseProvider } from '../supabase.provider';

@Module({
  controllers: [AuthController],
  providers:[AuthService, SupabaseProvider]
})
export class AuthModule {}
