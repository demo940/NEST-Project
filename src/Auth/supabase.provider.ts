import { Provider } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

export const SUPABASE = 'SUPABASE';

export const SupabaseProvider: Provider = {
  provide: SUPABASE,
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const supabaseUrl = config.get<string>('SUPABASE_URL');
    const supabaseKey = config.get<string>('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY in .env');
    }

    return createClient(supabaseUrl, supabaseKey);
  },
};
