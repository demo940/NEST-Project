import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseProvider } from './Auth/supabase.provider';
import { AuthModule } from './Auth/auth/auth.module';
import { TokenMiddleware } from './middleware/auth.middleware';
import { UserModule } from './User/user/user.module';


@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true }),
  AuthModule,
  UserModule
  ],

  controllers: [AppController],
  providers: [AppService, SupabaseProvider],
  exports: [SupabaseProvider]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({path:'user/profile', method: RequestMethod.ALL});
  }
}
