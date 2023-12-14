
import { StarIcon, CircleIcon, PenIcon } from "lucide-react";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Link } from "react-router-dom";

interface ProblemCardProps {
    _id: string;
    code: string;
    title: string;
    updatedAt: Date;
    isPublished: boolean;
}

export function ProblemCard({ _id, code, title, updatedAt, isPublished }: ProblemCardProps) {
    return (
        <Card>
            <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                <div className="space-y-1">
                    <CardTitle>{code}</CardTitle>
                    <CardDescription>
                        {title}
                    </CardDescription>
                </div>
                <Link to={`/dash/problems/${_id}`}>
                    <Button variant="secondary" className="px-3 w-full shadow-none">
                        <PenIcon className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                </Link>

            </CardHeader>
            <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        {
                            isPublished ? (
                                <CircleIcon className="mr-1 h-3 w-3 fill-green-400 text-green-400" />
                            ) : (
                                <CircleIcon className="mr-1 h-3 w-3 fill-red-400 text-red-400" />
                            )
                        }
                        {isPublished ? "Published" : "Pending"}
                    </div>
                    <div className="flex items-center">
                        <StarIcon className="mr-1 h-3 w-3" />
                        20k
                    </div>
                    <div>Updated ${updatedAt.toISOString()}</div>
                </div>
            </CardContent>
        </Card>
    )
}