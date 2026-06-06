import { createContext } from "react-router";
import { apiRequest } from "~/services/apiRequest";

export default async function branchMiddleware({ context, request }: { context: any, request:any }, next: any) {

    const { data } = await apiRequest("GET", "/appdata");
    context.set(branchContext, data);
    return await  next();
}

export const branchContext = createContext<any>({} as any);