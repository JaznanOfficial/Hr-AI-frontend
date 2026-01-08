"use client"

import { useMemo, useState } from "react"
import {
  Badge,
} from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { CalendarDays, MapPin, Users } from "lucide-react"
import type { JobPriority, JobStatus } from "@/data/jobs"
import { jobs as JOBS } from "@/data/jobs"

const JOBS_PER_PAGE = 6
const STATUS_OPTIONS: { label: string; value: JobStatus | "all" }[] = [
  { label: "All statuses", value: "all" },
  { label: "Open", value: "open" },
  { label: "In review", value: "in-review" },
  { label: "On hold", value: "on-hold" },
  { label: "Filled", value: "filled" },
]

const statusStyles: Record<JobStatus, string> = {
  open: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "in-review": "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "on-hold": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  filled: "bg-muted text-muted-foreground border-transparent",
}

const priorityStyles: Record<JobPriority, string> = {
  high: "text-destructive",
  medium: "text-primary",
  low: "text-muted-foreground",
}

export default function JobPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<JobStatus | "all">("all")

  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus =
        statusFilter === "all" ? true : job.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / JOBS_PER_PAGE))

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * JOBS_PER_PAGE
    return filteredJobs.slice(start, start + JOBS_PER_PAGE)
  }, [currentPage, filteredJobs])

  const rangeStart =
    filteredJobs.length === 0 ? 0 : (currentPage - 1) * JOBS_PER_PAGE + 1
  const rangeEnd =
    filteredJobs.length === 0
      ? 0
      : rangeStart + paginatedJobs.length - 1

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Talent Acquisition · Pipeline
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">
            Job Overview
          </h1>
        </div>
      </header>

      <div className="border-t border-border/40" />

      <section className="rounded-2xl border bg-card shadow-sm">
        <div className="flex flex-col gap-3 border-b p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            <Input
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search jobs by title, team, or location"
              className="w-full md:w-72"
            />
            <Select
              value={statusFilter}
              onValueChange={(value: JobStatus | "all") => {
                setStatusFilter(value)
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-full md:w-56">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-muted-foreground">
            {filteredJobs.length === 0 ? (
              "No jobs match the current filters."
            ) : (
              <>
                Showing {rangeStart}–{rangeEnd} of {filteredJobs.length} roles
              </>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead className="hidden lg:table-cell">Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Applicants</TableHead>
                <TableHead className="hidden xl:table-cell">Last activity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedJobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-sm text-muted-foreground">
                    No roles found. Adjust filters or try another search term.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="max-w-sm">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm font-medium leading-tight">
                          <a
                            href={`/jobs/${encodeURIComponent(job.id)}`}
                            className="inline-flex items-center gap-2 text-primary underline-offset-4 hover:underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {job.title}
                          </a>
                          <Badge
                            variant="outline"
                            className={cn(
                              "border-transparent text-[11px] uppercase",
                              priorityStyles[job.priority]
                            )}
                          >
                            {job.priority} priority
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span>{job.id}</span>
                          <span>{job.type}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground/70" />
                            {job.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5 text-muted-foreground/70" />
                            Posted {job.postedOn}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="font-medium text-sm">{job.department}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn("capitalize", statusStyles[job.status])}
                      >
                        {job.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div className="flex flex-col leading-tight">
                          <span className="text-sm font-semibold">
                            {job.applicants} applicants
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {job.matches} strong matches
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <div className="text-sm font-medium">{job.lastActivity}</div>
                      <div className="text-xs text-muted-foreground">Updated in Humio</div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-muted-foreground">
            {filteredJobs.length > 0
              ? `Tracking ${filteredJobs.length} active roles`
              : "Nothing to track right now"}
          </span>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(event) => {
                    event.preventDefault()
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }}
                  className={cn(currentPage === 1 && "pointer-events-none opacity-40")}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={pageNumber === currentPage}
                      onClick={(event) => {
                        event.preventDefault()
                        setCurrentPage(pageNumber)
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                )
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(event) => {
                    event.preventDefault()
                    setCurrentPage((prev) =>
                      Math.min(totalPages, prev + 1)
                    )
                  }}
                  className={cn(
                    currentPage === totalPages && "pointer-events-none opacity-40"
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </div>
  )
}
