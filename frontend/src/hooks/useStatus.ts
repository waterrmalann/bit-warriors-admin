import { API_ROUTES } from '@/lib/routes';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';

type StatusData = {
    name: string;
    online: boolean;
    uptime: string;
    environment: string;
    ping: string;
}

async function statusFetcher(url: string) {
    const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    }) as AxiosResponse<StatusData[]>;
    return res.data;
}

export default function useStatus() {
    const { data: status, mutate, error, isLoading } = useSWR<StatusData[]>(API_ROUTES.OVERVIEW.STATUS_GET, statusFetcher);

    return {
        status,
        mutate,
        error,
        isLoading
    };
}