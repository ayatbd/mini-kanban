import api from '../axios';

export interface AuthCredentials {
    user: unknown;
    token: string;
}

const normalizeAuthResponse = (payload: unknown): AuthCredentials => {
    if (!payload || typeof payload !== 'object') {
        throw new Error('Authentication response is invalid');
    }

    const response = payload as Record<string, unknown>;
    const data = response.data && typeof response.data === 'object'
        ? response.data as Record<string, unknown>
        : response;
    const rawToken = data.token ?? data.accessToken ?? response.token ?? response.accessToken;

    if (typeof rawToken !== 'string' || !rawToken.trim()) {
        throw new Error('Authentication response did not include a token');
    }

    return {
        user: data.user ?? response.user ?? data,
        token: rawToken.replace(/^Bearer\s+/i, '').trim(),
    };
};

export const loginUser = async (credentials: Record<string, string>) => {
    const response = await api.post('/auth/login', credentials);
    return normalizeAuthResponse(response.data);
};

export const registerUser = async (userData: Record<string, string>) => {
    const response = await api.post('/auth/register', userData);
    return normalizeAuthResponse(response.data);
};