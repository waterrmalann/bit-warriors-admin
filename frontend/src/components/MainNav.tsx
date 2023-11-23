import { Link } from "react-router-dom"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        to="/dash"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Overview
      </Link>
      <Link
        to="/dash/problems"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Problems
      </Link>
      <Link
        to="/dash/tracks"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Learning Tracks
      </Link>
      <Link
        to="/dash/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  )
}