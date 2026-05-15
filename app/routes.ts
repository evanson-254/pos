import { type RouteConfig, index, layout, route } from "@react-router/dev/routes"

export default [
    index("routes/home.tsx"), 
    layout("layout/AuthenticationLayout.tsx", [
        route("login", "routes/auth/login.tsx"),
        route("register", "routes/auth/register.tsx"),
        route("forgot-password", "routes/auth/forgot.tsx")
    ])    
] satisfies RouteConfig
