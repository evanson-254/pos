import { ArrowUpRightFromCircle, Bell, BookAudio, Briefcase, Building, CarFrontIcon, CarTaxiFrontIcon, CreditCard, GroupIcon, HistoryIcon, HomeIcon, PlusSquareIcon, Settings, ShieldCheck, ShoppingCart, UserRoundCogIcon, Users, type LucideIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Link, NavLink, useLoaderData, useLocation } from "react-router";
import type React from "react";
import { Avatar, AvatarGroup } from "./ui/avatar";
import { Button } from "./ui/button";
import { useContext } from "react";
import { userContext } from "~/middleware/auth";
import { ReusableForm } from "./FetcherForm";
import { cn } from "~/lib/utils";
interface LinksProps {
    name: string,
    path: string,
    icon: LucideIcon,
}

interface NavlinkProps {
    dashboard: LinksProps[],
    pos: LinksProps[],
    inventory: LinksProps[],
    customer: LinksProps[],
    extras: LinksProps[],
    reports: LinksProps[],
    branch: LinksProps[],
}

const navLinks: NavlinkProps = {
    dashboard: [
        {
            name: "Dashboard",
            path: "/",
            icon: HomeIcon,
        },

    ],
    pos: [
        {
            name: "New Sale",
            path: "/new-sale",
            icon: PlusSquareIcon
        },
        {
            name: "Sales History",
            path: "/sales-history",
            icon: HistoryIcon
        },
        {
            name: "Refunds",
            path: "/refunds",
            icon: ArrowUpRightFromCircle
        }
    ],
    inventory: [
        {
            name: "Products",
            path: "/products",
            icon: CarTaxiFrontIcon
        },
        {
            name: "Brands",
            path: "/brands",
            icon: UserRoundCogIcon
        },
        {
            name: "Categories",
            path: "/category",
            icon: GroupIcon
        },
        {
            name: "Purchases",
            path: "/purchases",
            icon: ShoppingCart
        },
        {
            name: "Suppliers",
            path: "/supplier",
            icon: Users
        },
    ],
    customer: [
        {
            name: "Customers",
            path: "/customers",
            icon: Users
        },
    ],
    reports: [
        {
            name: "Sales Reports",
            path: "/reports/sales",
            icon: BookAudio
        },
        {
            name: "Inventory Reports",
            path: "/reports/inventory",
            icon: ShoppingCart
        },
        {
            name: "Cashier Reports",
            path: "/reports/cashier",
            icon: CreditCard
        },
        {
            name: "Financial Reports",
            path: "/reports/financial",
            icon: Briefcase
        },

    ],
    extras: [
        {
            name: "Users & Roles",
            path: "/users",
            icon: Users
        },

        {
            name: "Settings",
            path: "/settings",
            icon: Settings
        },
        {
            name: "notifications",
            path: "/notifications",
            icon: Bell
        },
    ],
    branch: [
        {
            name: "Branch",
            path: "/branch",
            icon: Building
        },]
}
//     dashboard:{    [
//     {
//         name: "Dashboard",
//         path: "/dashboard",
//         icon: HomeIcon,
//     },
//     {
//         name: "Cashier",
//         path: "/dashboard/cashier",
//         icon: CreditCard,
//     },
//     {
//         name: "Customer",
//         path: "/dashboard/customer",
//         icon: Users
//     },
//     {
//         name: "Manager",
//         path: "/dashboard/manager",
//         icon: Briefcase
//     },
//     {
//         name: "Admin",
//         path: "/dashboard/admin",
//         icon: ShieldCheck
//     },
// ]}

interface logoutInputs {
  id: string,
}
export default function AppSidebar({ logout }: { logout?: React.ReactNode }) {
    const {user, branch} = useLoaderData();
    const {pathname} = useLocation();
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size={"lg"} tooltip={"point of sale"}>
                            <div className="flex aspect-square size-10">
                                <img src="/logo.png" alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="font-medium truncate uppercase">Point of Sale</span>
                                <span className="truncate">{branch?.name}</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {Object.entries(navLinks).map(([key, links]) => (
                    <SidebarGroup key={key}>
                        <SidebarGroupLabel>{key}</SidebarGroupLabel>
                        <SidebarMenu >
                            {links.map((link: LinksProps) => {
                                const isActive = link.path === pathname;
                            return (
                                <SidebarMenuItem key={link.name}>
                                    <SidebarMenuButton size={"sm"} asChild tooltip={link.name} isActive={isActive}>
                                        <NavLink 
                                        to={link.path} 

                                        className={ cn("flex items-center gap-2 text-sm", isActive && "  bg-primary/90! text-primary-foreground!")}>
                                            <link.icon className="w-5 h-5" />
                                            <span>{link.name}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )}
                        )}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}

            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton className="h-20" size={"lg"} asChild tooltip={"Details"}>
                            <div className="flex gap-4">
                                <img src="/logo.png" className="h-10 w-10 object-cover rounded-full" alt="" />
                                <div className="flex flex-col space-y-1 ">
                                    <span className="truncate">{user?.name}</span>
                                    <span className="font-medium truncate text-primary">{user?.role?.name}</span>  
                                    <ReusableForm<logoutInputs> actionUrl="/?index">
                                        {({ register, formState: { errors } }, { state }) => (
                                            <div>
                                                <input {...register("id")} value={"logout"} type="hidden" />
                                                {errors.id && <p className="text-error">{errors.id.message}</p>}
                                                <Button size={"xs"} variant={"link"} type="submit" disabled={state !== "idle"}>{state !== "idle" ? "Processing..." : "Logout"}</Button>
                                            </div>
                                        )}
                                    </ReusableForm>
                                </div>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}


