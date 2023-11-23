
import { ChevronDownIcon, PlusIcon, StarIcon, CircleIcon, PenIcon } from "lucide-react";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

interface ProblemCardProps {
    _id: string;
    code: string;
    title: string;
    updatedAt: Date;
}

export function ProblemCard({ _id, code, title, updatedAt }: ProblemCardProps) {
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
                        <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                        TypeScript
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