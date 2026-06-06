import { cn } from "~/lib/utils";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
interface AppModalProps {
    children?: React.ReactNode;
    title:string|(()=>string);
    description?: string;
    open?: boolean;
    onClose?: any;
    trigger?: any;
    width?: string;
}
export default function AppModal({
    children,
    title,
    open,
    onClose,
    description,
    trigger,
    width

}: AppModalProps) {
    return (
        <Dialog open={open}   onOpenChange={onClose}>
            {trigger &&
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
            }
            <DialogContent aria-setsize={1000} className={cn("max-h-[80vh] overflow-hidden flex flex-col", width)}>
                <DialogHeader>
                    <DialogTitle>{typeof title == "function" ? title() : title}</DialogTitle>
                    <DialogDescription className={cn(!description && "hidden")}>{description || "No description provided"}</DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-auto">
                    {/* <CardContent> */}
                        {children}
                    {/* </CardContent> */}
                </div>

            </DialogContent>
        </Dialog>
    )
}