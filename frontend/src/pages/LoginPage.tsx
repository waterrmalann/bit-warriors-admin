import { LoginForm } from '@components/forms/LoginForm.tsx';

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';


export default function AdminLoginPage() {
    const navigate = useNavigate();

    // State that determines if we are finally A-Ok for login.
    const [ok, setOk] = useState(false);
    useEffect(() => {
        if (ok) {
            // Redirect to dashboard now that  we are logged in.
            navigate('/dash', { replace: true });
        }
    }, [ok, navigate]);

    return (
        <>
            <div className="container relative h-screen flex flex-col my-auto items-center justify-center">
                <Link
                    to="http://localhost:3000/login"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Userspace
                </Link>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Administrator Login
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter valid superuser credentials to login.
                            </p>
                        </div>
                        <LoginForm setOk={setOk} />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            This panel is meant for authorized superusers only.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}