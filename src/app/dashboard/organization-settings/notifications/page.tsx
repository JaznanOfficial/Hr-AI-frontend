import { Bell, Smartphone, Slack } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const channels = [
  { label: "Email", description: "Send summaries and alerts to inboxes." },
  { label: "Slack", description: "Push instant notifications to recruiting channels." },
  { label: "Mobile push", description: "Nudge interviewers & approvers on the go." },
]

const flows = [
  {
    name: "Interview reminders",
    detail: "Notify panelists 24h & 1h before sessions.",
    delivery: ["Email", "Mobile push"],
  },
  { name: "Offer approvals", detail: "Escalate when finance approval exceeds SLA.", delivery: ["Slack"] },
  { name: "AI digest", detail: "Weekly performance insights for execs.", delivery: ["Email"] },
]

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Organization settings
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            Decide who hears about hiring moments—configure channels, delivery windows, and on-call backups.
          </p>
        </div>
        <Button size="sm" variant="outline" className="gap-2">
          <Bell className="h-4 w-4" />
          Pause all
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Channels</CardTitle>
            <CardDescription>Toggle what Humio uses for outbound communication.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {channels.map((channel) => (
              <div
                key={channel.label}
                className="flex items-center justify-between rounded-xl border px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{channel.label}</p>
                  <p className="text-xs text-muted-foreground">{channel.description}</p>
                </div>
                <Switch defaultChecked aria-label={`Enable ${channel.label}`} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>Automation flows</CardTitle>
            <CardDescription>Each flow supports granular subscribers with quiet hours.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {flows.map((flow) => (
              <div key={flow.name} className="rounded-2xl border px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">{flow.name}</p>
                    <p className="text-xs text-muted-foreground">{flow.detail}</p>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    {flow.delivery.includes("Slack") && <Slack className="h-4 w-4" />}
                    {flow.delivery.includes("Email") && <MailIcon />}
                    {flow.delivery.includes("Mobile push") && <Smartphone className="h-4 w-4" />}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {flow.delivery.map((method) => (
                    <Badge key={method} variant="outline">
                      {method}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Switch defaultChecked aria-label={`Enable ${flow.name}`} />
                  <span className="text-xs text-muted-foreground">Active</span>
                </div>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full text-primary">
              Add flow
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function MailIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
