import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"

export default [
    layout("layout/Dashboard_Layout.tsx", [
        index("routes/home.tsx"),
        route("new-sale", "routes/pos/newsale.tsx"),
        route("sales-history", "routes/pos/saleshistory.tsx"),
        route("refunds", "routes/pos/refunds.tsx"),
        route("products", "routes/inventory/product.tsx"),
        route("product/update/:id", "routes/inventory/product_update.tsx"),
        route("category", "routes/inventory/category.tsx"),
        route("purchases", "routes/inventory/purchases.tsx"),
        route("supplier", "routes/inventory/suplier.tsx"),
        route("brands", "routes/inventory/brand.tsx"),
        route("customers", "routes/customer.tsx"),
        route("settings", "routes/extras/settings.tsx"),
        route("notifications", "routes/extras/notification.tsx"),
        route("users", "routes/extras/users.tsx"),
        route("reports/sales", "routes/reports/sales.tsx"),
        route("reports/inventory", "routes/reports/inventory.tsx"),
        route("reports/cashier", "routes/reports/cashier.tsx"),
        route("reports/financial", "routes/reports/financial.tsx"),
        route("branch/:id?", "routes/branch.tsx"),
    ]),
    layout("layout/AuthenticationLayout.tsx", [
        route("login", "routes/auth/login.tsx"),
        route("register", "routes/auth/register.tsx"),
        route("forgot-password", "routes/auth/forgot.tsx"),
        route("reset-password/:token/:email", "routes/auth/reset.tsx")
    ])    
] satisfies RouteConfig
