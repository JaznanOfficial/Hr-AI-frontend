import { Building2, UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

const supportEmails = [
  { label: "People Ops", value: "people@humio.ai" },
  { label: "Recruiting", value: "talent@humio.ai" },
  { label: "Finance", value: "finance@humio.ai" },
]

export default function CompanyProfilePage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Organization settings
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">Company profile</h1>
        <p className="text-sm text-muted-foreground">
          Keep your core company information, brand assets, and regional details in sync for
          every workflow across Humio.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>General information</CardTitle>
            <CardDescription>
              These details surface in offer letters, email templates, and the candidate portal.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Legal name</Label>
                <Input id="name" defaultValue="Humio Laboratories Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Primary domain</Label>
                <Input id="domain" defaultValue="humio.ai" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hq">HQ location</Label>
                <Input id="hq" defaultValue="San Francisco, USA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employees">Employees</Label>
                <Input id="employees" defaultValue="425" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mission">Mission statement</Label>
              <Textarea
                id="mission"
                rows={3}
                defaultValue="Humio builds AI copilots for people teams, helping them hire, onboard, and develop talent with empathy and clarity."
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button variant="ghost" size="sm">
                Reset
              </Button>
              <Button size="sm">Save profile</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Brand assets</CardTitle>
              <CardDescription>Logo & accent colors cascade to candidate-facing flows.</CardDescription>
            </div>
            <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-xl border border-dashed p-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="flex size-14 items-center justify-center rounded-full bg-muted">
                  <UploadCloud className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-sm text-muted-foreground">
                  Drop your SVG logo or{" "}
                  <button className="text-primary underline-offset-4 hover:underline" type="button">
                    browse
                  </button>
                </div>
                <p className="text-xs text-muted-foreground/80">Recommended: 240 × 80</p>
              </div>
            </div>
            <Separator />
            <div className="space-y-3">
              <p className="text-sm font-medium">Support contacts</p>
              <div className="space-y-2">
                {supportEmails.map((contact) => (
                  <div
                    key={contact.label}
                    className="flex items-center justify-between rounded-xl border px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{contact.label}</p>
                      <p className="text-xs text-muted-foreground">{contact.value}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
