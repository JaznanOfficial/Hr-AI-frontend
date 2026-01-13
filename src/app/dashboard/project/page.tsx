"use client"

import { useMemo, useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, Plus } from "lucide-react"

const peopleDirectory = [
  { name: "Sadia Rahman", role: "HR Ops Lead", avatar: "https://i.pravatar.cc/150?img=5" },
  { name: "Kamal Uddin", role: "PM", avatar: "https://i.pravatar.cc/150?img=15" },
  { name: "Rafiq Hasan", role: "People Partner", avatar: "https://i.pravatar.cc/150?img=11" },
  { name: "Mouri Akter", role: "Designer", avatar: "https://i.pravatar.cc/150?img=47" },
  { name: "Emily Carter", role: "Enablement", avatar: "https://i.pravatar.cc/150?img=32" },
  { name: "Nabil Chowdhury", role: "Coach", avatar: "https://i.pravatar.cc/150?img=8" },
  { name: "Sarah Baloch", role: "Product Lead", avatar: "https://i.pravatar.cc/150?img=40" },
  { name: "Liam Torres", role: "Engineering", avatar: "https://i.pravatar.cc/150?img=12" },
  { name: "Ivy Hossain", role: "AI Analyst", avatar: "https://i.pravatar.cc/150?img=54" },
]

const initialProjects = [
  {
    name: "Global HR Transformation",
    team: peopleDirectory.slice(0, 4),
  },
  {
    name: "Leadership Accelerator 2.0",
    team: peopleDirectory.slice(4, 6),
  },
  {
    name: "Product Squad Revamp",
    team: peopleDirectory.slice(6, 9),
  },
]

const personId = (name: string) =>
  `assign-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`

export default function ProjectPage() {
  const [projects, setProjects] = useState(initialProjects)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [selectedPeople, setSelectedPeople] = useState<string[]>([])

  const isSubmitDisabled =
    !projectName.trim() || selectedPeople.length === 0

  const selectedTeam = useMemo(
    () =>
      selectedPeople
        .map((name) => peopleDirectory.find((person) => person.name === name))
        .filter(Boolean) as { name: string; role: string; avatar: string }[],
    [selectedPeople]
  )

  function togglePerson(name: string) {
    setSelectedPeople((prev) =>
      prev.includes(name)
        ? prev.filter((entry) => entry !== name)
        : [...prev, name]
    )
  }

  function handleCreateProject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isSubmitDisabled) return

    setProjects((prev) => [
      { name: projectName.trim(), team: selectedTeam },
      ...prev,
    ])

    setProjectName("")
    setSelectedPeople([])
    setDialogOpen(false)
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Monitor delivery health, team load, and upcoming milestones.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="size-4" />
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New project</DialogTitle>
              <DialogDescription>
                Name the initiative and assign the humans who will lead it.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-6" onSubmit={handleCreateProject}>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="project-name">
                  Project name
                </label>
                <Input
                  id="project-name"
                  placeholder="e.g. Workforce Insights Pilot"
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                />
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium">Assign people</p>
                <ScrollArea className="h-48 rounded-md border">
                  <div className="flex flex-col divide-y">
                    {peopleDirectory.map((person) => {
                      const checkboxId = personId(person.name)
                      return (
                        <label
                          key={person.name}
                          htmlFor={checkboxId}
                          className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-muted/50"
                        >
                          <Checkbox
                            id={checkboxId}
                            checked={selectedPeople.includes(person.name)}
                            onCheckedChange={() => togglePerson(person.name)}
                          />
                          <div className="flex items-center gap-3">
                            <Avatar className="size-8">
                              <AvatarImage src={person.avatar} alt={person.name} />
                              <AvatarFallback>
                                {person.name
                                  .split(" ")
                                  .map((part) => part[0])
                                  .join("")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{person.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {person.role}
                              </p>
                            </div>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                </ScrollArea>
              </div>
              <DialogFooter className="gap-2 sm:justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitDisabled}>
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="grid gap-4">
          {projects.map((project) => (
            <Card
              key={project.name}
              className={cn(
                "border-muted-foreground/10 shadow-none transition hover:border-primary/40"
              )}
            >
              <CardHeader className="space-y-3">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {project.name}
                  </CardTitle>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {project.team.map((member) => (
                        <Avatar
                          key={member.name}
                          className="size-9 border-2 border-background"
                        >
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">Open actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit project</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </CardContent>
      </Card>
      <div className="mt-auto flex justify-end">
        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
