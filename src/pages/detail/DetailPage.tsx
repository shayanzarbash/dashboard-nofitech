import {useEffect} from "react";
import {useLogStore} from "../../store/log.store.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useDetailUserQuery} from "./services/queries/detail-user.service.ts";

export default function UserDetailPage() {
    const navigate = useNavigate();
    const {id} = useParams<{ id: string }>();
    const {data: user, isLoading} = useDetailUserQuery(id);
    const addLog = useLogStore((state) => state.addLog);

    const handleBackCLick = () => {
        navigate(`/users`)
    }

    useEffect(() => {
        addLog({type: "page_view", message: "Visited Detail Users Page"});
    }, [addLog]);

    if (isLoading) return <div className="p-6  text-black">Loading...</div>;
    if (!user) return <div className="p-6  text-black">User not found</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between">
                <h2 className=" text-black text-xl font-semibold mb-4">{user.name}</h2>
                <button onClick={handleBackCLick}>back to list</button>
            </div>
            <p className="text-black"><strong>Email:</strong> {user.email}</p>
            <p className="text-black"><strong>Username:</strong> {user.username}</p>
            <p className="text-black"><strong>Phone:</strong> {user.phone}</p>
            <p className="text-black"><strong>Website:</strong> {user.website}</p>
        </div>
    );
}
