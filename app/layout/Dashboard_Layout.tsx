import { Outlet, useLoaderData } from "react-router";
import type { Route } from "./+types/Dashboard_Layout";
import { AuthMiddleware, userContext } from "~/middleware/auth";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import AppSidebar from "~/components/Sidebar";
import { Separator } from "~/components/ui/separator";
import DashboardBreadCrumb from "~/components/dashboardBreadCrumb";


export const clientMiddleware: Route.MiddlewareFunction[] = [
    AuthMiddleware
];
export async function clientLoader({ context }: Route.ClientLoaderArgs) {
    const user = context.get(userContext);
    return { user };
}


export default function DashboardLayout() {
    const data = useLoaderData();
    return (
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
    )
}