import {Link} from "react-router-dom";

export default function Navbar() {

    const menuItems = [
        {path: "/users", label: "Users"},
        {path: "/logs", label: "Logs"},
    ];

    return (
        <div className="h-full">
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center text-white gap-2 p-2 rounded-md hover:bg-gray-700 ${
                            location.pathname === item.path ? "bg-gray-700" : ""
                        }`}
                    >
                        <span className="text-white">{item.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}