import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useLogStore} from "../../store/log.store.ts";
import {useAuthStore} from "../../store/auth.store.ts";
import type {LoginFormInputs} from "./libraries/form-type.ts";
import toast, { Toaster } from "react-hot-toast";

function generateMockToken(length = 32) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < length; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

export default function LoginPage() {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginFormInputs>();
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);
    const addLog = useLogStore((state) => state.addLog);
    const mockToken = generateMockToken();

    const onSubmit = async (data: LoginFormInputs) => {
        await new Promise((r) => setTimeout(r, 1000));

        if (data.email === "user@example.com" && data.password === "password123") {
            login({name: "Shayan", email: data.email});
            addLog({type: "login", message: "User logged in"});
            localStorage.setItem("authToken", mockToken);
            navigate("/users");
        } else {
            toast.error("Invalid email or password");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-md"
            >
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Login
                </h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-600 mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="example@mail.com"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            },
                        })}
                        className={`w-full border border-gray-400 p-2 text-black rounded focus:outline-none focus:ring-2 ${errors.email ? "border-red-400 focus:ring-red-300" : "focus:ring-blue-300"
                        }`}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-600 mb-2">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters",
                            },
                        })}
                        className={`w-full border border-gray-400 text-black p-2 rounded focus:outline-none focus:ring-2 ${errors.password ? "border-red-400 focus:ring-red-300" : "focus:ring-blue-300"
                        }`}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500 mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition"
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </form>
            <Toaster position="bottom-right" />
        </div>
    );
}
