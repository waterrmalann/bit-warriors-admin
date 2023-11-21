import React, { useRef, useState } from "react"

import { cn } from "@/lib/utils"

import { LuLoader2 } from 'react-icons/lu';

import { Button } from "@components/ui/button";
import { Label } from "@components/ui/label";
import { Input } from "@components/ui/input";
import useLogin from "@hooks/useLogin";

import { AxiosError } from 'axios';

//  Redirect to the dashboard on successful login
//  navigate('/dash', { replace: true });

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
    setOk: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LoginForm({ className, setOk, ...props }: LoginFormProps) {
    const { trigger } = useLogin();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<AxiosError | null>(null);

    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);


    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (username && password) {
            setError(null);
            setIsLoading(true);
            const { error: err } = await trigger(username, password);
            setIsLoading(false);
            if (err) {
                console.error(error);
                setError(err);
            } else {
                setOk(true);
            }
        }
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="admin@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            ref={usernameRef}
                        />
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="passphrase"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="h-16 my-2"
                            ref={passwordRef}
                        />
                    </div>
                    <Button disabled={isLoading}>
                        {isLoading && (
                            <LuLoader2 className="animate-spin mr-2 h-4 w-4" />
                        )}
                        Log In
                    </Button>
                </div>
            </form>
            {error && <p className="text-red-500 text-center">{error.message}</p>}
        </div>
    )
}