import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Briefcase, CalendarDays, DollarSign, MapPin } from "lucide-react"

import { jobs } from "@/data/jobs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function generateStaticParams() {
  return jobs.map((job) => ({ jobId: job.id }))
}

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ jobId: string }>
}) {
  const { jobId } = await params
  const normalizedId = decodeURIComponent(jobId).toLowerCase()
  const job = jobs.find((item) => item.id.toLowerCase() === normalizedId)

  if (!job) {
    notFound()
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col gap-10 px-4 py-10 md:px-6">
      <div className="flex flex-col gap-3">
        <Link
          href="/dashboard/talent-acquisition/job-page"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to openings
        </Link>
        <div className="flex flex-col gap-4 rounded-2xl border bg-card/80 p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="capitalize" variant="outline">
              {job.status.replace("-", " ")}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {job.priority} priority
            </Badge>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-muted-foreground">Humio · {job.department}</p>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {job.title}
            </h1>
            <p className="mt-2 text-base text-muted-foreground">{job.summary}</p>
          </div>
          <div className="grid gap-4 border-t pt-4 text-sm text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {job.location}
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> {job.type}
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" /> Posted {job.postedOn}
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> {job.salaryRange}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="sm" type="button">
              <Link href={job.applyLink} target="_blank" rel="noreferrer">
                Apply now
              </Link>
            </Button>
            <span className="text-sm text-muted-foreground">
              Last updated {job.lastActivity} · {job.applicants} applicants
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border bg-card/80 p-6 shadow-sm lg:col-span-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Role overview</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {job.description}
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold">Key responsibilities</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {job.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold">Requirements</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {job.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <aside className="rounded-2xl border bg-card/80 p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold">Perks & benefits</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {job.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
              <p>
                Questions? Reach out to{" "}
                <button
                  type="button"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  talent@humio.ai
                </button>
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
