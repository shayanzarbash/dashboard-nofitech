import {useEffect, useMemo, useRef, useState} from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {useNavigate} from "react-router-dom";
import {useDebounce} from "../../hooks/useDebounce";
import {useLogStore} from "../../store/log.store.ts";
import type {IUser} from "./models/dto/user-list.dto.ts";
import {useUserListQuery} from "./services/queries/user-list.service.ts";

export default function UsersPage() {
    const navigate = useNavigate();
    const [tableData, setTableData] = useState<IUser[]>([]);
    const [editingRowId, setEditingRowId] = useState<number | null>(null);
    const [editedUser, setEditedUser] = useState<Partial<IUser>>({});
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const addLog = useLogStore((state) => state.addLog);
    const {data: users = [], isLoading} = useUserListQuery();

    useEffect(() => {
        addLog({type: "page_view", message: "Visited Users Page"});
    }, [addLog]);

    useEffect(() => {
        if (users.length) setTableData(users);
    }, [users]);

    const filteredData = useMemo(() => {
        if (!debouncedSearch) return tableData;
        return tableData.filter(
            (u) =>
                u.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                u.email.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [debouncedSearch, tableData]);

    const handleEdit = (user: IUser) => {
        setEditingRowId(user.id);
        setEditedUser(user);
        addLog({type: "edit", message: `Edited User ${user.id}`});
    };

    const handleSave = (id: number) => {
        setTableData((prev) =>
            prev.map((u) => (u.id === id ? {...u, ...editedUser} : u))
        );
        setEditingRowId(null);
        setEditedUser({});
    };

    const handleDelete = (id: number) => {
        setTableData((prev) => prev.filter((u) => u.id !== id));
        addLog({type: "delete", message: `Deleted User ${id}`});
    };

    const columnHelper = createColumnHelper<IUser>();

    const columns = [
        columnHelper.accessor("name", {
            header: "Name",
            cell: ({row}) => (
                <h4
                    onClick={() => navigate(`/users/${row.original.id}`)}
                    className="text-blue-600 hover:underline"
                >
                    {row.original.name}
                </h4>
            ),
        }),
        columnHelper.accessor("username", {
            header: "UserName",
            cell: info => info.getValue(),
        }),
        columnHelper.accessor("email", {
            header: "Email",
            cell: (info) => {
                const isEditing = editingRowId === info.row.original.id;
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const inputRef = useRef<HTMLInputElement>(null);

                // eslint-disable-next-line react-hooks/rules-of-hooks
                useEffect(() => {
                    if (isEditing && inputRef.current) {
                        inputRef.current.focus();
                    }
                }, [isEditing]);

                return isEditing ? (
                    <input
                        ref={inputRef}
                        className="border rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300"
                        value={editedUser.email ?? info.getValue()}
                        onChange={(e) =>
                            setEditedUser({...editedUser, email: e.target.value})
                        }
                    />
                ) : (
                    <span>{info.getValue()}</span>
                );
            },
        }),
        columnHelper.display({
            id: "actions",
            header: "Actions",
            cell: (info) => {
                const user = info.row.original;
                const isEditing = editingRowId === user.id;
                return (
                    <div>
                        {isEditing ? (
                            <button
                                className="text-white mr-2"
                                onClick={() => handleSave(user.id)}
                            >
                                Save
                            </button>
                        ) : (
                            <button
                                className="text-white mr-2"
                                onClick={() => handleEdit(user)}
                            >
                                Edit
                            </button>
                        )}
                        <button
                            className="text-white"
                            onClick={() => handleDelete(user.id)}
                        >
                            Delete
                        </button>
                    </div>
                );
            },
        }),
    ];

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-black">Users</h2>
            <div className="mb-4 flex items-center gap-2">
                <input
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm text-black border border-gray-400 text-black p-2 rounded"
                />
            </div>
            <table className="min-w-full border border-gray-200">
                <thead className="bg-gray-100">
                {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id}>
                        {hg.headers.map((header) => (
                            <th key={header.id} className="p-2 text-left text-black">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-t text-black hover:bg-gray-50">
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="p-2 text-black">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
