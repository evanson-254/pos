import { RotateCcw, Clock3, CheckCircle2 } from "lucide-react";
import  { Card, CardContent } from "./ui/card";

export default function RefundStats() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-0 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Refunds
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  $245
                </h2>
              </div>

              <RotateCcw className="h-10 w-10 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-0 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Requests
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  1
                </h2>
              </div>

              <Clock3 className="h-10 w-10 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-0 border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Approved Refunds
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  1
                </h2>
              </div>

              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>
  )}