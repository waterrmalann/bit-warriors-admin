import { MainNav } from '@components/MainNav';
import { UserNav } from '@components/UserNav';
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <>
            <div className="hidden flex-col md:flex">
                <div>
                    <div className="flex h-16 items-center px-4">
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            <UserNav />
                        </div>
                    </div>
                </div>
                <Outlet />
            </div>
        </>
    )
}


export default DashboardLayout