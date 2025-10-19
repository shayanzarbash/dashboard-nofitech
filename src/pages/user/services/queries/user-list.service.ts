import {useQuery} from "@tanstack/react-query";
import type {IUser} from "../../models/dto/user-list.dto.ts";

const fetchUsers = async (): Promise<IUser[]> => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    return res.json();
};

export const useUserListQuery = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });
};