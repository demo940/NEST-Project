import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthModule } from 'src/Auth/auth/auth.module';
import { SupabaseProvider } from 'src/Auth/supabase.provider';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers:[SupabaseProvider]
})
export class UserModule {}
