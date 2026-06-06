import { Outlet, useLoaderData } from "react-router";
import type { Route } from "./+types/Dashboard_Layout";
import { appDataContext, AuthMiddleware, userContext } from "~/middleware/auth";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import AppSidebar from "~/components/Sidebar";
import { Separator } from "~/components/ui/separator";
import DashboardBreadCrumb from "~/components/dashboardBreadCrumb";
import { pathsToPermissions, requirePermission } from "~/middleware/permission";
import { AppDataProvider, UserProvider } from "~/middleware/user";
import branchMiddleware, { branchContext } from "~/middleware/branch";


export const clientMiddleware: Route.MiddlewareFunction[] = [
    AuthMiddleware,
    //branchMiddleware,
];
export async function clientLoader({ context, request }: Route.ClientLoaderArgs) {
   
    const data = context.get(appDataContext);
    return { user: data?.user, branch: data?.branch};
}



export default function DashboardLayout() {
    const data = useLoaderData();
    return (
        <AppDataProvider data={{ user: data?.user, branch: data?.branch }}>
            {/* <UserProvider user={data?.user}> */}
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>

                        <header className="flex h-16 shrink-0 items-center border-b gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                            <div className="flex items-center gap-2 px-4">
                                <SidebarTrigger className="-ml-1" />
                                <Separator
                                    orientation="vertical"
                                    className="mr-2 data-[orientation=vertical]:h"
                                />
                                <DashboardBreadCrumb />
                            </div>
                        </header>
                        <main >
                            <Outlet />
                        </main>
                    </SidebarInset>

                </SidebarProvider>
            {/* </UserProvider> */}
        </AppDataProvider>

    )
}