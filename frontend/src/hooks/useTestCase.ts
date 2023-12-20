import { API_ROUTES } from '@/lib/routes';
import axios, { AxiosResponse } from 'axios';
import useSWR from 'swr';

type Test = {
    label: string;
    params: string[];
    expect: string;
}

type TestCase = { 
    _id: string;
    problem: string;
    problemId: string;
    preloadedCode?: string;
    language: string;
    functionName: string;
    testCases: Test[],
    isPublished: boolean;
}

type TestCaseData = Omit<TestCase, "_id" | "problemId" | "isPublished">;

interface TestCaseEditResponse {
    success: true;
}

async function testCasePut(url: string, data: TestCaseData) {
    try {
        const res = await axios.put(url, data, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // get cookies
        }) as AxiosResponse<TestCaseEditResponse>;
        return { data: res.data, error: undefined }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return { data: undefined, error: error };
        } else {
            throw error;
        }
    }
}

async function testCaseFetcher(url: string) {
    const res = await axios.get(url, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    }) as AxiosResponse<TestCase>;
    console.log("Axios", res);
    return res.data;
}

export default function useTestCase(problemId: string) {
    const { data: testCases, mutate, error, isLoading } = useSWR<TestCase>(API_ROUTES.TESTS.GET(problemId), testCaseFetcher);
    console.log(testCases);

    return {
        editProblem: async (id: string, data: TestCaseData) => {
            return testCasePut(API_ROUTES.TESTS.PUT(id, testCases?._id || 'test'), data)
        },
        testCases,
        mutate,
        error,
        isLoading
    };
}