import { ShieldCheck, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const roles = [
  { name: "People Administrator", members: 12, permissions: ["All modules", "Billing"], status: "full" },
  { name: "Recruiter", members: 24, permissions: ["Talent acquisition", "AI tools"], status: "limited" },
  { name: "Manager", members: 63, permissions: ["Performance reviews", "Headcount requests"], status: "limited" },
  { name: "Viewer", members: 108, permissions: ["Dashboards"], status: "read" },
]

const auditLogs = [
  { action: "Updated recruiter role permissions", actor: "Maya Kim", timestamp: "Today · 09:21" },
  { action: "Invited 4 managers", actor: "Harrison Cole", timestamp: "Yesterday · 18:04" },
  { action: "Revoked AI access", actor: "Talent Ops bot", timestamp: "Yesterday · 12:11" },
]

export default function RolesPermissionsPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Organization settings</p>
          <h1 className="text-2xl font-semibold tracking-tight">Roles & permissions</h1>
          <p className="text-sm text-muted-foreground">
            Govern access to Humio—segment by function, limit privileged actions, and audit every change.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <ShieldCheck className="h-4 w-4" />
            Permission matrix
          </Button>
          <Button size="sm" className="gap-2">
            <UserPlus className="h-4 w-4" />
            New role
          </Button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[3fr_1.2fr]">
        <Card>
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Active roles</CardTitle>
              <CardDescription>Role changes sync instantly to SSO providers and audit history.</CardDescription>
            </div>
            <Input placeholder="Search roles..." className="md:w-64" />
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.name}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>{role.members}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 text-xs text-muted-foreground">
                        {role.permissions.map((perm) => (
                          <span key={perm} className="rounded-full bg-muted px-2 py-0.5">
                            {perm}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant="outline"
                        className={
                          role.status === "full"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                            : role.status === "limited"
                              ? "border-blue-500/30 bg-blue-500/10 text-blue-300"
                              : "border-muted bg-muted text-muted-foreground"
                        }
                      >
                        {role.status === "full" && "Full access"}
                        {role.status === "limited" && "Limited"}
                        {role.status === "read" && "Read only"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Every permission edit is recorded with actor identity.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {auditLogs.map((log) => (
              <div key={log.action} className="rounded-xl border px-4 py-3 text-sm">
                <p className="font-medium">{log.action}</p>
                <p className="text-xs text-muted-foreground">
                  {log.actor} · {log.timestamp}
                </p>
              </div>
            ))}
            <Button variant="ghost" size="sm" className="w-full text-primary">
              View audit trail
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
