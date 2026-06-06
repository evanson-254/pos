import { createContext, redirect } from "react-router"
import { apiRequest } from "~/services/apiRequest";
import { pathsToPermissions, requirePermission } from "./permission";
//mport type { Route } from "../+types/root";

export async function AuthMiddleware({ context, request }: { context: any, request:any }, next: any) {
    const { data } = await apiRequest("GET", "/appdata");

    if (!data) {
        throw redirect("/login");
    }
    const url = new URL(request.url);
    const user = data?.user;
    const pathname = url.pathname;

    const permissionRequired = pathsToPermissions?.[pathname];
    ///5655console.log(data?.permissions?.map((user:any)=> user.name), permissionRequired);
    if (permissionRequired) {
        requirePermission( user?.permissions, permissionRequired);
    }
    context.set(appDataContext, data);
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
    permissons: string[],
}


export const userContext = createContext<User>({} as User);
export const appDataContext = createContext<{ user: User, branch: any }>({ user: {} as User, branch: {} as any });