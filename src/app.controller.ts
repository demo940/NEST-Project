import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { SUPABASE } from './Auth/supabase.provider';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject(SUPABASE) private supabase ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
