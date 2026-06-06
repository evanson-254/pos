import { redirect } from "react-router";
import { useAppData, useUser } from "./user";

interface User {
    permissions: string[];
}


export function requirePermission(
    userPermissions: string[],
    permissions: string[]
) {

    let allowed = 0;

    permissions.forEach((permission) => {
        if (userPermissions?.includes(permission)) {

            allowed++;
        }
    });
    if (allowed == 0) { throw redirect("/"); }

}

export function useRoles() {
    const {user} = useAppData();

    const is_myRole = (role: string) => {
        return user?.permissions?.includes(role.toLocaleLowerCase());
    }

    return { is_myRole, user };
}

export const pathsToPermissions: Record<string, string[]> = {
    "/branch": ["manage_branches", "view_branches"],
    "/users": ["manage_users", "view_users"],
    "/supplier": ["manage_suppliers", "view_suppliers"],
    "/category": ["manage_inventory", "view_inventory"],
    "/brands": ["manage_inventory", "view_inventory"],
}