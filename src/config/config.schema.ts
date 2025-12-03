import { IsString, IsUrl, IsDefined } from 'class-validator';

export class EnvConfig {
  @IsDefined()
  @IsUrl()
  SUPABASE_URL: string;

  @IsDefined()
  @IsString()
  SUPABASE_ANON_KEY: string;
}
