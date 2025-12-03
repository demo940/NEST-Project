import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseProvider } from './Auth/supabase.provider';
import { AuthModule } from './Auth/auth/auth.module';
import { TokenMiddleware } from './middleware/auth.middleware';
import { UserModule } from './User/user/user.module';
import { EnvConfig } from './config/config.schema';

function formatValidationErrors(errors: ValidationError[]): string {
  return errors
    .map((err) => {
      const constraints = err.constraints
        ? Object.values(err.constraints).join(', ')
        : '';
      return `${err.property}: ${constraints}`;
    })
    .join('; ');
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const validatedConfig = plainToClass(EnvConfig, config, {
          enableImplicitConversion: true,
        });
        const errors = validateSync(validatedConfig, { skipMissingProperties: false });
        if (errors.length > 0) {
          throw new Error(`Config validation failed: ${formatValidationErrors(errors)}`);
        }
        return validatedConfig;
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseProvider],
  exports: [SupabaseProvider],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TokenMiddleware)
      .forRoutes({ path: 'user/profile', method: RequestMethod.ALL });
  }
}
