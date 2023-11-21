import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useToast } from "@components/ui/use-toast";
import LoadingSpinner from "@components/LoadingSpinner";
import { useEffect } from "react";
import { useAdmin } from "@hooks/useAdmin";

const PrivateRoute = () => {
    const { admin, error, loading } = useAdmin();
    const { toast } = useToast();
    const navigate = useNavigate();

    // useEffect to handle navigation on error
    useEffect(() => {
        if (error) {
            toast({ variant: "destructive", title: "An error occurred." });
            navigate('/login');
        }
    }, [error, navigate, toast]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (admin) {
        return <Outlet />;
    } else {
        //navigate('/login', { replace: true });
        return <Navigate to="/login" replace={true} />;
    }
}

export default PrivateRoute;