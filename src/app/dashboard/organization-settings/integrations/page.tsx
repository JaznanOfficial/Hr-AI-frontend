import { CheckCircle2, PlugZap, Zap } from "lucide-react"

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

const activeIntegrations = [
  {
    name: "Okta",
    category: "SSO",
    status: "Synced · 2 hrs ago",
    description: "Provision Humio roles directly from Okta groups.",
  },
  {
    name: "Ashby",
    category: "ATS",
    status: "Live sync",
    description: "Enrich candidate profiles and push stages instantly.",
  },
  {
    name: "Slack",
    category: "Collaboration",
    status: "Daily summary",
    description: "Send hiring alerts to talent #channels.",
  },
]

const marketplace = [
  { name: "Greenhouse", category: "ATS", badge: "New" },
  { name: "Workday", category: "HRIS" },
  { name: "Microsoft Teams", category: "Collaboration" },
  { name: "BambooHR", category: "HRIS" },
]

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Organization settings
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Integrations</h1>
          <p className="text-sm text-muted-foreground">
            Connect Humio to your identity, recruiting, and productivity stack. Track sync health in real
            time.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Zap className="h-4 w-4" />
          View API keys
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Connected apps</CardTitle>
            <CardDescription>Disable or re-authenticate integrations without leaving Humio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeIntegrations.map((integration) => (
              <div
                key={integration.name}
                className="flex flex-col gap-2 rounded-2xl border px-4 py-3 md:flex-row md:items-center"
              >
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{integration.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {integration.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{integration.description}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {integration.status}
                  </div>
                </div>
                <Switch defaultChecked aria-label={`Toggle ${integration.name} integration`} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marketplace</CardTitle>
            <CardDescription>Coming soon integrations requested by Humio teams.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {marketplace.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-xl border px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge ? (
                    <Badge variant="outline" className="text-xs">
                      {item.badge}
                    </Badge>
                  ) : null}
                  <Button size="sm" variant="ghost" className="gap-1 text-primary">
                    <PlugZap className="h-4 w-4" />
                    Request
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
