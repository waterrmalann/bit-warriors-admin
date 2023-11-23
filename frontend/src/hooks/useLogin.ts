import { API_ROUTES } from '@/lib/routes';
import axios, { AxiosResponse } from 'axios';

type LoginCredentials = {
    email: string;
    passphrase: string;
};

interface LoginResult {
    mfa_required: boolean,
    message: string,
    token: string
}

async function loginPost(url: string, { email, passphrase }: LoginCredentials) {
    try {
        const res = await axios.post(url, {
            email, passphrase
        }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // get cookies
        }) as AxiosResponse<LoginResult>;
        return { data: res.data, error: undefined }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { data: undefined, error: error };
        } else {
            throw error;
        }
    }
}

export default function useLogin() {
    return {
        trigger: async (email: string, passphrase: string) => {
            return loginPost(API_ROUTES.AUTH.LOGIN_POST, { email, passphrase })
        },
        isMutating: false
    };
}