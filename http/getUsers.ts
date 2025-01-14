import { APIRequestContext } from '@playwright/test';
import { BACKEND_URL } from '../utils/constants';

export async function getUsers(
    request: APIRequestContext,
    token?: string
): Promise<{ response: any; status: number }> {
    const headers: Record<string, string> = token ? {
        'Authorization': `Bearer ${token}`
    } : {};

    const response = await request.get(`${BACKEND_URL}/users`, {
        headers
    });

    const responseBody = await response.json();

    return {
        response: responseBody,
        status: response.status()
    };
} 