import { useLocation } from "react-router";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "./ui/breadcrumb";

export default function DashboardBreadCrumb() {
    const { pathname } = useLocation();
    const isBase = pathname.split("/")[1] === "";
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {!isBase && (
                    <>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="/">
                                Dashboard
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                    </>
                )}
                <BreadcrumbItem>
                    <BreadcrumbPage>{isBase ? "Dashboard" : pathname.split("/")[1]}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}