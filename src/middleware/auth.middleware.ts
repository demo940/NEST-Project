import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: any, _: any, next: () => void) {
    let token: string | undefined;

    const auth = req.headers.authorization;
    if (auth?.startsWith('Bearer ')) {
      token = auth.replace('Bearer ', '');
    }

    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    req.token = token;

    next();
  }
}
