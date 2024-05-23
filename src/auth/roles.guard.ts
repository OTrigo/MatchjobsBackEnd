import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      throw new HttpException(
        'No privileges to access this page',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new HttpException(
        'No privileges to access this page',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    return requiredRoles.includes(user.role);
  }
}
