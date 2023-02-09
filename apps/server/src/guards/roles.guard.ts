import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verifyJwt } from '../utils';

@Injectable()
export class RoleGuard implements CanActivate {
  public constructor(private readonly _reflector: Reflector) {}

  public canActivate = (context: ExecutionContext): boolean => {
    const roles = this._reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = verifyJwt(request) as any;
    const hasRole = () =>
      user.roles.some((role: string) => roles.includes(role));
    return user && user.roles && hasRole();
  };
}
