import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService : ConfigService){
     console.log('PORT:', this.configService.get<number>('PORT'));
  }
  getHello(): string {
    return 'Hello World! ';
  }
}
