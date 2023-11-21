import { Button } from '@components/ui/button';
import { Link } from "react-router-dom";


const HomePage = () => {
    return (
        <div className="flex h-full items-center justify-center text-center">
            <p className="font-mono">Hello World</p>
            <Link to="/login"><Button>Login</Button></Link>
        </div>
    )
}

export default HomePage