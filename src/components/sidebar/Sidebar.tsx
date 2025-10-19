import Logout from "./components/logout/Logout.tsx";
import Navbar from "./components/navbar/NavBar.tsx";

export default function Sidebar() {

    return (
        <aside className="w-60 h-screen bg-gray-800 text-white flex flex-col fixed left-0 top-0">
            <div className="text-2xl font-bold p-4 border-b border-gray-700">Dashboard</div>
            <Navbar/>
            <Logout/>
        </aside>
    );
}
