import { cn } from "~/lib/utils";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
interface AppModalProps {
    children?: React.ReactNode;
    title: string;
    description?: string;
    open?: boolean;
    onClose?: any;
    trigger?: any;
}
export default function AppModal({
    children,
    title,
    open,
    onClose,
    description,
    trigger
}: AppModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            {trigger &&
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>
            }
            <DialogContent className="max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
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