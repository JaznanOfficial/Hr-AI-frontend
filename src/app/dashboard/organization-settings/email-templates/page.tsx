import { Mail, PenLine } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const templates = [
  { name: "Interview invite", updated: "Today · 07:14", usage: "High" },
  { name: "Offer letter", updated: "Yesterday · 16:02", usage: "Medium" },
  { name: "Rejection note", updated: "Mon · 11:41", usage: "Medium" },
  { name: "Onboarding welcome", updated: "Aug 17 · 09:00", usage: "Low" },
]

const variables = ["candidate.first_name", "candidate.role", "interview.time_slot", "company.name"]

export default function EmailTemplatesPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Organization settings
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Email templates</h1>
          <p className="text-sm text-muted-foreground">
            Craft consistent communication for candidates and employees. Templates auto-sync with AI
            copilots and scheduling flows.
          </p>
        </div>
        <Button size="sm" className="gap-2">
          <PenLine className="h-4 w-4" />
          New template
        </Button>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Template library</CardTitle>
            <CardDescription>Use taxonomy to keep messaging consistent across regions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Search templates..." />
            <div className="space-y-3">
              {templates.map((template) => (
                <button
                  key={template.name}
                  type="button"
                  className="w-full rounded-xl border px-4 py-3 text-left hover:border-primary/40 hover:bg-primary/5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{template.name}</p>
                      <p className="text-xs text-muted-foreground">{template.updated}</p>
                    </div>
                    <Badge variant="outline">{template.usage}</Badge>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Preview · Interview invite</CardTitle>
              <CardDescription>Send via Humio scheduler · Last edited 2 hours ago by Maya.</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              Auto-populates candidate context
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input defaultValue="Interview invite for {{candidate.first_name}}" />
              <Input defaultValue="talent@humio.ai" />
            </div>
            <Textarea
              rows={10}
              defaultValue={`Hi {{candidate.first_name}},\n\nThanks for your time with Humio so far. We'd love to invite you to the {{interview.stage}} conversation with {{interview.panel_lead}}. Please use the link below to lock in a time that works best for you.\n\n{{scheduler.link}}\n\nLooking forward to continuing the conversation!\n\n— Humio Talent Team`}
            />
            <div className="flex flex-wrap gap-2">
              {variables.map((variable) => (
                <Badge key={variable} variant="outline" className="cursor-pointer">
                  {variable}
                </Badge>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm">
                Discard
              </Button>
              <Button size="sm">Save changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
