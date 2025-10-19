import {useLogStore} from "../../../../store/log.store.ts";

export default function Logout() {
    const addLog = useLogStore((state) => state.addLog);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
        addLog({type: "logout", message: "User logged out"});
    };

    return (
        <div className="flex justify-center items-center">
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 p-3 text-left hover:bg-gray-700 border-t border-gray-700 w-[210px] mb-4"
            >
                Logout
            </button>
        </div>
    )
}