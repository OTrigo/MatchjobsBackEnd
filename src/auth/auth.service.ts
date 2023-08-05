import { Injectable } from '@nestjs/common';

@Injectable({})
export class authService {
  signUp() {
    return { msg: 'sign-Up' };
  }

  signIn() {
    return { msg: 'sign-In' };
  }
}
