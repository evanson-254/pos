import type React from "react"
import { Outlet } from "react-router"
import { ScrollArea } from "~/components/ui/scroll-area"

interface AuthLayoutProp{
    children?: React.ReactElement
}

export default function AuthenticationLayout({children}:AuthLayoutProp){
    return(
        <section className="flex h-screen overflow-hidden">
            <div className="flex-grow-1 flex-shrink-0 hidden p-2  md:flex flex-col  gap-4 items-center rounded-r-xl  justify-center bg-brand text-primary-foreground">
                <img src="/favicon.ico" alt="logo" />
                <h6 className="font-semibold">POS</h6>
                <p className="bg-brand">
                    Modern Point of Sales
                </p>
                <p>
                    Authenticate to start using POS
                </p>
                <p className="">
                    Powered by <a href="https://evansonapi.is-best.net" target="_blank" className="underline">webfusion</a>
                </p>
            </div>
            <div className="flex-grow-1 flex-shrink-0">
                {/* {children} */}
                <ScrollArea className="h-[100%] py-4 my-2 ">
                    <Outlet/>
                </ScrollArea>
                
            </div>            
        </section>
    )
}