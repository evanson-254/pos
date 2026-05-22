import { createContext, redirect } from "react-router"
import { apiRequest } from "~/services/apiRequest";
//mport type { Route } from "../+types/root";

export async function AuthMiddleware({ context }: { context: any }, next: any) {
    const { data } = await apiRequest("GET", "/user");

    if (!data) {
        throw redirect("/login");
    }
    context.set(userContext, data);
    return await  next();
}

//export const clientMiddleware:Route.MiddlewareFunction[] = [AuthMiddleware]; 

export interface User {
    id: string,
    name: string,
    email: string,
    account: string,
    profile: string,
    created_at: string,
}


export const userContext = createContext<User | null>(null);