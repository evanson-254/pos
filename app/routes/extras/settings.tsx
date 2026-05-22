import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { Button } from "~/components/ui/button";

import { Switch } from "~/components/ui/switch";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="p-6">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>POS Settings</CardTitle>

          <CardDescription>
            Configure your store preferences and system settings
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="store" className="space-y-6">
            <TabsList>
              <TabsTrigger value="store">Store</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Store Settings */}
            <TabsContent value="store">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Store Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <Label>Store Name</Label>
                    <Input defaultValue="Fusion POS" />
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input defaultValue="store@example.com" />
                  </div>

                  <div>
                    <Label>Phone</Label>
                    <Input defaultValue="+254700000000" />
                  </div>

                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Settings */}
            <TabsContent value="system">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>System Preferences</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between border rounded-xl p-4">
                    <div>
                      <h3 className="font-medium">Enable Dark Mode</h3>
                      <p className="text-sm text-muted-foreground">
                        Switch between dark and light theme
                      </p>
                    </div>

                    <Switch />
                  </div>

                  <div className="flex items-center justify-between border rounded-xl p-4">
                    <div>
                      <h3 className="font-medium">
                        Automatic Backups
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        Backup POS data daily
                      </p>
                    </div>

                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div>
                    <Label>Current Password</Label>
                    <Input type="password" />
                  </div>

                  <div>
                    <Label>New Password</Label>
                    <Input type="password" />
                  </div>

                  <div>
                    <Label>Confirm Password</Label>
                    <Input type="password" />
                  </div>

                  <Button>Update Password</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}