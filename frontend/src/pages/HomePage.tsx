import { Button } from '@components/ui/button';
import { Link } from "react-router-dom";


const HomePage = () => {
    return (
        <div className="flex flex-col gap-2 h-screen items-center justify-center text-center">
            <h1 className="font-mono text-xl">Admin Panel</h1>
            <div className="block">
                <Link to="/login"><Button variant="default">Login</Button></Link>
            </div>
        </div>
    )
}

export default HomePage