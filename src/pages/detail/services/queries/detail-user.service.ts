import {useQuery} from "@tanstack/react-query";
import type {IDetailUser} from "../../models/dto/detali-user.dto.ts";

export const fetchUser = async (id: string): Promise<IDetailUser> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
};

export const useDetailUserQuery = (id?: string) => {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => fetchUser(id!),
        enabled: !!id,
    });
};
