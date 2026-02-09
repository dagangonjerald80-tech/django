"use client";

export function ERDDiagram() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Entity Relationship Diagram
        </h2>
        <p className="text-sm text-muted-foreground">
          Database schema showing the relationships between Doctor, Patient, and
          Appointment models.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center lg:gap-4">
        {/* Doctor Entity */}
        <div className="w-full max-w-xs rounded-lg border-2 border-primary/30 bg-card shadow-sm">
          <div className="border-b border-primary/30 bg-primary/10 px-4 py-3 rounded-t-lg">
            <h3 className="text-center font-bold text-primary">Doctor</h3>
          </div>
          <div className="divide-y divide-border">
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-xs text-primary">
                PK
              </span>
              <span className="font-mono text-sm text-foreground">
                id
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                BigAutoField
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-foreground">name</span>
              <span className="ml-auto text-xs text-muted-foreground">
                CharField(200)
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-foreground">
                specialization
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                CharField(50)
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-foreground">phone</span>
              <span className="ml-auto text-xs text-muted-foreground">
                CharField(20)
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-foreground">email</span>
              <span className="ml-auto text-xs text-muted-foreground">
                EmailField
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-muted-foreground">
                created_at
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                DateTimeField
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-muted-foreground">
                updated_at
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                DateTimeField
              </span>
            </div>
          </div>
        </div>

        {/* Relationships Arrow Left */}
        <div className="flex flex-col items-center justify-center py-4 lg:py-16">
          <div className="text-xs font-medium text-muted-foreground mb-1">
            1
          </div>
          <div className="h-12 w-0.5 bg-primary/40 lg:hidden" />
          <div className="hidden lg:block w-16 h-0.5 bg-primary/40" />
          <div className="text-xs font-medium text-muted-foreground mt-1">
            M
          </div>
        </div>

        {/* Appointment Entity (Center) */}
        <div className="w-full max-w-xs rounded-lg border-2 border-accent-foreground/30 bg-card shadow-sm">
          <div className="border-b border-accent-foreground/30 bg-accent px-4 py-3 rounded-t-lg">
            <h3 className="text-center font-bold text-accent-foreground">
              Appointment
            </h3>
          </div>
          <div className="divide-y divide-border">
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-xs text-primary">
                PK
              </span>
              <span className="font-mono text-sm text-foreground">
                id
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                BigAutoField
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs text-amber-700">
                FK
              </span>
              <span className="font-mono text-sm text-foreground">
                doctor_id
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                ForeignKey
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs text-amber-700">
                FK
              </span>
              <span className="font-mono text-sm text-foreground">
                patient_id
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                ForeignKey
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-foreground">date</span>
              <span className="ml-auto text-xs text-muted-foreground">
                DateField
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-foreground">time</span>
              <span className="ml-auto text-xs text-muted-foreground">
                TimeField
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-foreground">status</span>
              <span className="ml-auto text-xs text-muted-foreground">
                CharField(20)
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-foreground">notes</span>
              <span className="ml-auto text-xs text-muted-foreground">
                TextField
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-muted-foreground">
                created_at
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                DateTimeField
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-muted-foreground">
                updated_at
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                DateTimeField
              </span>
            </div>
          </div>
          <div className="border-t border-accent-foreground/30 bg-muted/50 px-4 py-2 rounded-b-lg">
            <p className="text-xs text-muted-foreground text-center">
              unique_together: [doctor, date, time]
            </p>
          </div>
        </div>

        {/* Relationships Arrow Right */}
        <div className="flex flex-col items-center justify-center py-4 lg:py-16">
          <div className="text-xs font-medium text-muted-foreground mb-1">
            M
          </div>
          <div className="h-12 w-0.5 bg-primary/40 lg:hidden" />
          <div className="hidden lg:block w-16 h-0.5 bg-primary/40" />
          <div className="text-xs font-medium text-muted-foreground mt-1">
            1
          </div>
        </div>

        {/* Patient Entity */}
        <div className="w-full max-w-xs rounded-lg border-2 border-primary/30 bg-card shadow-sm">
          <div className="border-b border-primary/30 bg-primary/10 px-4 py-3 rounded-t-lg">
            <h3 className="text-center font-bold text-primary">Patient</h3>
          </div>
          <div className="divide-y divide-border">
            <div className="flex items-center gap-2 px-4 py-2">
              <span className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-xs text-primary">
                PK
              </span>
              <span className="font-mono text-sm text-foreground">
                id
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                BigAutoField
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-foreground">name</span>
              <span className="ml-auto text-xs text-muted-foreground">
                CharField(200)
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-foreground">age</span>
              <span className="ml-auto text-xs text-muted-foreground">
                PositiveIntegerField
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-foreground">gender</span>
              <span className="ml-auto text-xs text-muted-foreground">
                CharField(1)
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-foreground">phone</span>
              <span className="ml-auto text-xs text-muted-foreground">
                CharField(20)
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-foreground">email</span>
              <span className="ml-auto text-xs text-muted-foreground">
                EmailField
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-foreground">
                address
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                TextField
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-muted-foreground">
                created_at
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                DateTimeField
              </span>
            </div>
            <div className="px-4 py-2 flex items-center gap-2">
              <span className="font-mono text-sm text-muted-foreground">
                updated_at
              </span>
              <span className="ml-auto text-xs text-muted-foreground">
                DateTimeField
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
        <div className="flex items-center gap-2">
          <span className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-xs text-primary">
            PK
          </span>
          <span className="text-sm text-muted-foreground">Primary Key</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-amber-100 px-1.5 py-0.5 font-mono text-xs text-amber-700">
            FK
          </span>
          <span className="text-sm text-muted-foreground">Foreign Key</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">1 --- M</span>
          <span className="text-sm text-muted-foreground">
            One-to-Many Relationship
          </span>
        </div>
      </div>
    </div>
  );
}
