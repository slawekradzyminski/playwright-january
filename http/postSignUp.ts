import { APIRequestContext } from '@playwright/test';
import { BACKEND_URL } from '../utils/constants';
import { SignUpRequest, SignUpResponse } from '../types/auth.types';

export async function postSignUp(
  request: APIRequestContext,
  userData: SignUpRequest
): Promise<{ response: SignUpResponse | Record<string, string>; status: number }> {
  const response = await request.post(`${BACKEND_URL}/users/signup`, {
    data: userData
  });
  
  const responseBody = await response.json();
  
  return {
    response: responseBody,
    status: response.status()
  };
}
