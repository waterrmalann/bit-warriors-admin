import { API_ROUTES } from '@/lib/routes';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';

type Admin = {
    _id: string;
    email: string;
};

async function adminFetcher(url: string) {
    const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    }) as AxiosResponse<Admin>;
    return res.data;
}

export function useAdmin() {
    const { data: admin, mutate, error, isLoading, isValidating } = useSWR<Admin>(API_ROUTES.AUTH.GET, adminFetcher);

    const loading = admin === undefined && error === undefined;
    const isLoggedIn = !!admin && !isLoading; // error && error.status === 403;

    const logout = async () => {
        const request = await fetch(API_ROUTES.AUTH.LOGOUT_GET, { credentials: 'include' });
        console.log("Logged Out");
        console.log(request);
        if (!request.ok) {
            throw new Error("Could not log out.");
        }
        mutate(() => undefined, false);
    };

    return {
        admin,
        error,
        loading,
        validating: isValidating,
        mutate,
        logout,
        isLoggedIn,
    };
}