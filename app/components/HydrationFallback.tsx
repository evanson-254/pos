import { Card, CardContent } from "~/components/ui/card";
import { Loader2 } from "lucide-react";

export default function HydrationFallback() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
            <Card className="w-full max-w-md ">
                <CardContent className="flex flex-col items-center justify-center gap-5 py-12">
                    
                    {/* Animated Loader */}
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>

                    {/* Text Content */}
                    <div className="space-y-2 text-center">
                        <h2 className="text-xl font-semibold tracking-tight">
                            Loading POS System
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Preparing dashboard, products, sales, and reports...
                        </p>
                    </div>

                    {/* Skeleton Preview */}
                    <div className="w-full space-y-3 pt-4">
                        <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
                        <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                        <div className="h-4 w-5/6 animate-pulse rounded-md bg-muted" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}