import { API_ROUTES } from '@/lib/routes';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';

type Problem = { 
    _id: string;
    title: string;
    description: string;
    difficulty: string;
    tags: string[];
    hint?: string;
}

type ProblemData = Omit<Problem, "_id">;

interface ProblemEditResponse {
    success: true;
}

async function problemPut(url: string, data: ProblemData) {
    try {
        const res = await axios.put(url, data, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // get cookies
        }) as AxiosResponse<ProblemEditResponse>;
        return { data: res.data, error: undefined }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { data: undefined, error: error };
        } else {
            throw error;
        }
    }
}

async function problemDelete(url: string) {
    try {
        const res = await axios.delete(url, {
            withCredentials: true, // get cookies
        }) as AxiosResponse<ProblemEditResponse>;
        return { data: res.data, error: undefined }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { data: undefined, error: error };
        } else {
            throw error;
        }
    }
}

async function problemFetcher(url: string) {
    const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    }) as AxiosResponse<Problem>;
    return res.data;
}

export default function useProblemById(id: string) {
    const { data: problem, mutate, error, isLoading } = useSWR<Problem>(API_ROUTES.PROBLEMS.PROBLEM_GET(id), problemFetcher);

    return {
        editProblem: async (data: ProblemData) => {
            return problemPut(API_ROUTES.PROBLEMS.PUT(id), data)
        },
        deleteProblem: async () => {
            return problemDelete(API_ROUTES.PROBLEMS.DELETE(id))
        },
        problem,
        mutate,
        error,
        isLoading
    };
}