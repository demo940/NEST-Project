import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidateUserPipe implements PipeTransform {
  transform(value: any) {
    if (value.password && value.password.includes('123')) {
      throw new BadRequestException('Weak password.');
    }
    return value;
  }
}
