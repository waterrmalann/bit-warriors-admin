export const API_ROUTES = {
    AUTH: {
        GET: 'http://localhost:4000/auth',
        LOGIN_POST: 'http://localhost:4000/auth',
        LOGOUT_GET: 'http://localhost:4000/auth/logout',
    },
    PROBLEMS: {
        GET: "http://localhost:4000/problems",
        PROBLEM_GET: (id: string) => `http://localhost:4000/problems/${id}`,
        POST: "http://localhost:4000/problems",
        PUT: (id: string) => `http://localhost:4000/problems/${id}`,
        DELETE: (id: string) => `http://localhost:4000/problems/${id}`
    }
};