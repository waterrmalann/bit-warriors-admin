import { API_ROUTES } from '@/lib/routes';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';

type Problem = { 
    _id: string;
    title: string;
    description: string;
    difficulty: string;
    tags: string;
    hint?: string;
}

type ProblemData = Omit<Problem, "_id">;

interface ProblemCreationResponse {
    problemId: string;
}

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

async function problemPost(url: string, data: ProblemData) {
    try {
        const res = await axios.post(url, data, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // get cookies
        }) as AxiosResponse<ProblemCreationResponse>;
        return { data: res.data, error: undefined }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { data: undefined, error: error };
        } else {
            throw error;
        }
    }
}

async function problemsFetcher(url: string) {
    const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    }) as AxiosResponse<Problem[]>;
    return res.data;
}

export default function useProblem() {
    const { data: problems, mutate, error, isLoading } = useSWR<Problem[]>(API_ROUTES.PROBLEMS.GET, problemsFetcher);

    return {
        createProblem: async (data: ProblemData) => {
            return problemPost(API_ROUTES.PROBLEMS.POST, data)
        },
        editProblem: async (id: string, data: ProblemData) => {
            return problemPut(API_ROUTES.PROBLEMS.PUT(id), data)
        },
        problems,
        mutate,
        error,
        isLoading
    };
}