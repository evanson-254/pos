import { createContext, useContext } from "react";

type branchType = {
    id: number,
    name: string,
    location: string,
    address: string,
    phone: string,
    manager: string,
    staff: number,
    stock: number,
    status: string,
}

export const AuthContext = createContext<User>({} as User);
export const AppDataContext = createContext<{ user: User, branch: branchType }>({ user: {} as User, branch: {} as branchType });
export const useUser = () =>{
   return  useContext(AuthContext);
}
export const useAppData = () =>{
    const { user, branch } = useContext(AppDataContext);
    return { user, branch };
}

   
export const UserProvider = ({ children , user }: { children: React.ReactNode, user: User }) => {

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const AppDataProvider = ({ children, data }: { children: React.ReactNode, data: { user: User, branch: branchType } }) => {
    return <AppDataContext.Provider value={data}>{children}</AppDataContext.Provider>;
};



interface User {
    id: string,
    name: string,
    email: string,
    account: string,
    profile: string,
    created_at: string,
    permissions: string[],
}