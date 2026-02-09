"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoctorsPanel } from "@/components/doctors-panel";
import { PatientsPanel } from "@/components/patients-panel";
import { AppointmentsPanel } from "@/components/appointments-panel";
import { ERDDiagram } from "@/components/erd-diagram";
import { CodeViewer } from "@/components/code-viewer";
import { SetupGuide } from "@/components/setup-guide";
import {
  Stethoscope,
  Users,
  CalendarDays,
  Database,
  Code2,
  BookOpen,
} from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <CalendarDays className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Clinic Appointment System
              </h1>
              <p className="text-sm text-muted-foreground">
                Django REST Framework + CRUD Operations
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              DRF
            </span>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
              Python
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-muted">
            <TabsTrigger
              value="appointments"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              <CalendarDays className="h-4 w-4" />
              <span className="hidden sm:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger
              value="doctors"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              <Stethoscope className="h-4 w-4" />
              <span className="hidden sm:inline">Doctors</span>
            </TabsTrigger>
            <TabsTrigger
              value="patients"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Patients</span>
            </TabsTrigger>
            <TabsTrigger
              value="erd"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">ERD</span>
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              <Code2 className="h-4 w-4" />
              <span className="hidden sm:inline">DRF Code</span>
            </TabsTrigger>
            <TabsTrigger
              value="setup"
              className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Setup</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <AppointmentsPanel />
          </TabsContent>

          <TabsContent value="doctors">
            <DoctorsPanel />
          </TabsContent>

          <TabsContent value="patients">
            <PatientsPanel />
          </TabsContent>

          <TabsContent value="erd">
            <ERDDiagram />
          </TabsContent>

          <TabsContent value="code">
            <CodeViewer />
          </TabsContent>

          <TabsContent value="setup">
            <SetupGuide />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
