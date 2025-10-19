import Sidebar from "../sidebar/Sidebar";
import {Outlet} from "react-router-dom";

export default function DashboardLayout() {
    return (
        <div className="flex">
            <Sidebar/>
            <main className="ml-60 flex-1 p-6 bg-gray-50 min-h-screen">
                <Outlet/>
            </main>
        </div>
    );
}
