import { Button } from "~/components/ui/button"
import { userContext } from "~/middleware/auth";
import type { Route } from "./+types/home";
import { redirect, useSubmit } from "react-router";
import { apiRequest } from "~/services/apiRequest";
import { toast } from "sonner";
import { ReusableForm } from "~/components/FetcherForm";
import { DashboardCards } from "~/components/dashboardCards";
import DashboardTable from "~/components/dasboardtable";
import LowStockAlert from "~/components/lowstockCard";
import SalesChart from "~/components/salesChart";
import DashboardStats from "~/components/dashbordStats";
import TopSellingProducts from "~/components/TopsellingProduct";
import SalesByCategory from "~/components/SalesByCategory";
import PaymentAnalytics from "~/components/PaymentAnalytics";
import CashierActivity from "~/components/CashierActivity";
import QuickActions from "~/components/QuicAction";




export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const { data, errors, message, status } = await apiRequest("POST", "/logout", formData);
  if (status == 200) {
    toast.success(message);
    // return redirect("/");
  }
  return { data, errors, message }
}

export async function clientLoader({ context }: Route.ClientLoaderArgs) {
  const user = context.get(userContext);
  return { user };
}




export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <title>Dashboard - POS</title>
      <section className="space-y-6 px-4 my-4">
        {/* <DashboardCards /> */}
        <DashboardStats />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <LowStockAlert />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <TopSellingProducts/>
          <SalesByCategory/>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <PaymentAnalytics/>
          <CashierActivity/>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <QuickActions/>
          <div className="lg:col-span-2">
            <DashboardTable />
          </div>
        </div>        
      </section>
    </>
  )
}
