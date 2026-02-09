"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Terminal,
  FolderTree,
  Globe,
  CheckCircle2,
} from "lucide-react";

function BrowserStep({
  step,
  title,
  url,
  description,
}: {
  step: number;
  title: string;
  url: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-border bg-muted/50 p-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
        {step}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <code className="text-xs font-mono text-primary break-all">{url}</code>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
}

function PostmanStep({ step, text }: { step: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
        {step}
      </span>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function EndpointRow({
  method,
  path,
  description,
}: {
  method: string;
  path: string;
  description: string;
}) {
  const methodColors: Record<string, string> = {
    GET: "bg-emerald-100 text-emerald-700 border-emerald-200",
    POST: "bg-blue-100 text-blue-700 border-blue-200",
    PUT: "bg-amber-100 text-amber-700 border-amber-200",
    PATCH: "bg-orange-100 text-orange-700 border-orange-200",
    DELETE: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="flex items-center gap-3">
      <Badge
        variant="outline"
        className={`w-16 justify-center font-mono text-xs ${methodColors[method] || ""}`}
      >
        {method}
      </Badge>
      <code className="text-sm font-mono text-foreground">{path}</code>
      <span className="ml-auto text-xs text-muted-foreground hidden sm:inline">
        {description}
      </span>
    </div>
  );
}

export function SetupGuide() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          VS Code Setup Guide
        </h2>
        <p className="text-sm text-muted-foreground">
          Follow these steps to run the Django REST Framework backend locally in
          VS Code.
        </p>
      </div>

      {/* Project Structure */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-foreground text-base">
            <FolderTree className="h-5 w-5 text-primary" />
            Project Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="rounded-lg bg-muted p-4 text-sm font-mono text-foreground leading-relaxed overflow-x-auto">
            {`django_backend/
  manage.py
  requirements.txt
  clinic_project/
    __init__.py
    settings.py
    urls.py
    wsgi.py
  appointments/
    __init__.py
    apps.py
    models.py          # Doctor, Patient, Appointment
    serializers.py     # DRF ModelSerializers
    views.py           # DRF ModelViewSets (CRUD)
    urls.py            # DRF DefaultRouter
    admin.py           # Django Admin config`}
          </pre>
        </CardContent>
      </Card>

      {/* Step-by-step guide */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Terminal className="h-5 w-5 text-primary" />
          Step-by-Step Setup
        </h3>

        {/* Step 1 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-foreground text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                1
              </span>
              Create & Activate Virtual Environment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-lg bg-muted p-4 text-sm font-mono text-foreground overflow-x-auto">
              {`# Open terminal in VS Code (Ctrl + \`)
# Navigate to the django_backend folder

cd django_backend

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\\Scripts\\activate
# macOS/Linux:
source venv/bin/activate`}
            </pre>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-foreground text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                2
              </span>
              Install Dependencies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-lg bg-muted p-4 text-sm font-mono text-foreground overflow-x-auto">
              {`pip install -r requirements.txt`}
            </pre>
            <p className="mt-3 text-sm text-muted-foreground">
              This installs Django, Django REST Framework, and
              django-cors-headers.
            </p>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-foreground text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                3
              </span>
              Run Migrations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-lg bg-muted p-4 text-sm font-mono text-foreground overflow-x-auto">
              {`# Create database tables from models
python manage.py makemigrations
python manage.py migrate

# (Optional) Create admin superuser
python manage.py createsuperuser`}
            </pre>
            <p className="mt-3 text-sm text-muted-foreground">
              This creates the SQLite database with Doctor, Patient, and
              Appointment tables as defined in models.py.
            </p>
          </CardContent>
        </Card>

        {/* Step 4 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-foreground text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                4
              </span>
              Run the Development Server
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="rounded-lg bg-muted p-4 text-sm font-mono text-foreground overflow-x-auto">
              {`python manage.py runserver`}
            </pre>
            <p className="mt-3 text-sm text-muted-foreground">
              Server starts at{" "}
              <code className="rounded bg-muted-foreground/10 px-1.5 py-0.5 text-foreground">
                http://127.0.0.1:8000/
              </code>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Step 5 - Open Browser */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-3 text-foreground text-sm">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">5</span>
            Open the DRF Browsable API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            While the server is running, open your browser and go to:
          </p>
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4 text-center">
            <code className="text-lg font-mono font-bold text-primary">http://127.0.0.1:8000/api/</code>
          </div>
          <p className="text-sm text-muted-foreground">
            You will see the <strong>DRF Browsable API</strong> -- a built-in interactive web page that Django REST Framework provides automatically. It lets you test all CRUD operations directly in your browser without any extra tools.
          </p>
        </CardContent>
      </Card>

      {/* STEP 6 - Full Step-by-Step Testing Guide */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">6</span>
          <h3 className="text-lg font-semibold text-foreground">Test the API -- Step-by-Step Walkthrough</h3>
        </div>

        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm text-foreground">
            Follow these 10 steps <strong>in order</strong>. Each step shows the exact command, what to do, and what response you should see.
          </p>
        </div>

        {/* Step 6.1 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-foreground text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">6.1</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200 font-mono text-xs">CREATE</Badge>
              Create Your First Doctor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Open a <strong>new terminal</strong> in VS Code (keep the server running in the first one). Run:</p>
            <pre className="rounded-lg bg-muted p-4 text-sm font-mono text-foreground leading-relaxed overflow-x-auto">{`curl -X POST http://127.0.0.1:8000/api/doctors/ \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Dr. Jane Smith","specialization":"cardiology","phone":"555-1234","email":"jane@clinic.com"}'`}</pre>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Expected Response (HTTP 201 Created):</p>
              <pre className="text-xs font-mono text-emerald-800 leading-relaxed">{`{
    "id": 1,
    "name": "Dr. Jane Smith",
    "specialization": "cardiology",
    "phone": "555-1234",
    "email": "jane@clinic.com",
    "created_at": "2026-02-09T10:30:00Z"
}`}</pre>
            </div>
            <p className="text-xs text-muted-foreground">The <code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono">"id": 1</code> is auto-generated. Remember this ID for later steps.</p>
          </CardContent>
        </Card>

        {/* Step 6.2 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-foreground text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">6.2</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200 font-mono text-xs">CREATE</Badge>
              Create a Second Doctor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <pre className="rounded-lg bg-muted p-4 text-sm font-mono text-foreground leading-relaxed overflow-x-auto">{`curl -X POST http://127.0.0.1:8000/api/doctors/ \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Dr. John Doe","specialization":"neurology","phone":"555-5678","email":"john@clinic.com"}'`}</pre>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Expected Response (HTTP 201 Created):</p>
              <pre className="text-xs font-mono text-emerald-800 leading-relaxed">{`{
    "id": 2,
    "name": "Dr. John Doe",
    "specialization": "neurology",
    "phone": "555-5678",
    "email": "john@clinic.com",
    "created_at": "2026-02-09T10:31:00Z"
}`}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Step 6.3 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-foreground text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">6.3</span>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200 font-mono text-xs">READ</Badge>
              List All Doctors
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Verify both doctors were created:</p>
            <pre className="rounded-lg bg-muted p-4 text-sm font-mono text-foreground leading-relaxed overflow-x-auto">{`curl http://127.0.0.1:8000/api/doctors/`}</pre>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Expected Response (HTTP 200 OK) -- returns an array:</p>
              <pre className="text-xs font-mono text-emerald-800 leading-relaxed">{`[
    {
        "id": 1,
        "name": "Dr. Jane Smith",
        "specialization": "cardiology",
        ...
    },
    {
        "id": 2,
        "name": "Dr. John Doe",
        "specialization": "neurology",
        ...
    }
]`}</pre>
            </div>
            <p className="text-xs text-muted-foreground">Or open <code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono">http://127.0.0.1:8000/api/doctors/</code> in your browser to see it formatted.</p>
          </CardContent>
        </Card>

        {/* Step 6.4 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-foreground text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">6.4</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200 font-mono text-xs">CREATE</Badge>
              Create a Patient
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <pre className="rounded-lg bg-muted p-4 text-sm font-mono text-foreground leading-relaxed overflow-x-auto">{`curl -X POST http://127.0.0.1:8000/api/patients/ \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Alice Johnson","date_of_birth":"1990-05-15","phone":"555-9999","email":"alice@mail.com","address":"123 Main Street"}'`}</pre>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Expected Response (HTTP 201 Created):</p>
              <pre className="text-xs font-mono text-emerald-800 leading-relaxed">{`{
    "id": 1,
    "name": "Alice Johnson",
    "date_of_birth": "1990-05-15",
    "phone": "555-9999",
    "email": "alice@mail.com",
    "address": "123 Main Street",
    "created_at": "2026-02-09T10:32:00Z"
}`}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Step 6.5 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-foreground text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">6.5</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200 font-mono text-xs">CREATE</Badge>
              Book an Appointment (Links Doctor + Patient)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Use <code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono">"doctor": 1</code> and <code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono">"patient": 1</code> -- the IDs from Steps 6.1 and 6.4:</p>
            <pre className="rounded-lg bg-muted p-4 text-sm font-mono text-foreground leading-relaxed overflow-x-auto">{`curl -X POST http://127.0.0.1:8000/api/appointments/ \\
  -H "Content-Type: application/json" \\
  -d '{"doctor":1,"patient":1,"date":"2026-03-15","time":"10:00:00","status":"scheduled","notes":"Annual heart checkup"}'`}</pre>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Expected Response (HTTP 201 Created):</p>
              <pre className="text-xs font-mono text-emerald-800 leading-relaxed">{`{
    "id": 1,
    "doctor": 1,
    "patient": 1,
    "doctor_name": "Dr. Jane Smith",
    "patient_name": "Alice Johnson",
    "date": "2026-03-15",
    "time": "10:00:00",
    "status": "scheduled",
    "notes": "Annual heart checkup",
    "created_at": "2026-02-09T10:33:00Z"
}`}</pre>
            </div>
            <p className="text-xs text-muted-foreground">The response includes <code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono">doctor_name</code> and <code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono">patient_name</code> so you can see who is linked.</p>
          </CardContent>
        </Card>

        {/* Step 6.6 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-foreground text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">6.6</span>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200 font-mono text-xs">READ</Badge>
              View a Single Doctor (by ID)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <pre className="rounded-lg bg-muted p-4 text-sm font-mono text-foreground leading-relaxed overflow-x-auto">{`curl http://127.0.0.1:8000/api/doctors/1/`}</pre>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Expected Response (HTTP 200 OK) -- single object, not an array:</p>
              <pre className="text-xs font-mono text-emerald-800 leading-relaxed">{`{
    "id": 1,
    "name": "Dr. Jane Smith",
    "specialization": "cardiology",
    "phone": "555-1234",
    "email": "jane@clinic.com",
    "created_at": "2026-02-09T10:30:00Z"
}`}</pre>
            </div>
          </CardContent>
        </Card>

        {/* Step 6.7 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-foreground text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-bold">6.7</span>
              <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 font-mono text-xs">UPDATE</Badge>
              Update a Doctor (Change Specialization)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Change Dr. Jane Smith from <strong>cardiology</strong> to <strong>pediatrics</strong>:</p>
            <pre className="rounded-lg bg-muted p-4 text-sm font-mono text-foreground leading-relaxed overflow-x-auto">{`curl -X PUT http://127.0.0.1:8000/api/doctors/1/ \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Dr. Jane Smith","specialization":"pediatrics","phone":"555-1234","email":"jane@clinic.com"}'`}</pre>
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
              <p className="text-xs font-semibold text-amber-700 mb-1">Expected Response (HTTP 200 OK) -- notice specialization changed:</p>
              <pre className="text-xs font-mono text-amber-800 leading-relaxed">{`{
    "id": 1,
    "name": "Dr. Jane Smith",
    "specialization": "pediatrics",    <-- updated!
    "phone": "555-1234",
    "email": "jane@clinic.com",
    "created_at": "2026-02-09T10:30:00Z"
}`}</pre>
            </div>
            <p className="text-xs text-muted-foreground"><strong>PUT</strong> replaces the entire object. You must send all fields. Use <strong>PATCH</strong> to send only the fields you want to change.</p>
          </CardContent>
        </Card>

        {/* Step 6.8 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-foreground text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-bold">6.8</span>
              <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200 font-mono text-xs">UPDATE</Badge>
              Update an Appointment Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Mark the appointment as <strong>completed</strong>:</p>
            <pre className="rounded-lg bg-muted p-4 text-sm font-mono text-foreground leading-relaxed overflow-x-auto">{`curl -X PATCH http://127.0.0.1:8000/api/appointments/1/ \\
  -H "Content-Type: application/json" \\
  -d '{"status":"completed"}'`}</pre>
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
              <p className="text-xs font-semibold text-amber-700 mb-1">Expected Response (HTTP 200 OK):</p>
              <pre className="text-xs font-mono text-amber-800 leading-relaxed">{`{
    "id": 1,
    "doctor": 1,
    "patient": 1,
    "doctor_name": "Dr. Jane Smith",
    "patient_name": "Alice Johnson",
    "date": "2026-03-15",
    "time": "10:00:00",
    "status": "completed",    <-- updated!
    "notes": "Annual heart checkup",
    "created_at": "2026-02-09T10:33:00Z"
}`}</pre>
            </div>
            <p className="text-xs text-muted-foreground"><strong>PATCH</strong> only updates the fields you send. Here we only changed <code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono">status</code>.</p>
          </CardContent>
        </Card>

        {/* Step 6.9 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-foreground text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-red-700 text-xs font-bold">6.9</span>
              <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 font-mono text-xs">DELETE</Badge>
              Delete the Second Doctor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <pre className="rounded-lg bg-muted p-4 text-sm font-mono text-foreground leading-relaxed overflow-x-auto">{`curl -X DELETE http://127.0.0.1:8000/api/doctors/2/`}</pre>
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-xs font-semibold text-red-700 mb-1">Expected Response:</p>
              <pre className="text-xs font-mono text-red-800 leading-relaxed">{`HTTP 204 No Content

(empty response body -- this means success!)`}</pre>
            </div>
            <p className="text-xs text-muted-foreground">Verify by running <code className="rounded bg-muted px-1.5 py-0.5 text-foreground font-mono">curl http://127.0.0.1:8000/api/doctors/</code> -- only Dr. Jane Smith should remain.</p>
          </CardContent>
        </Card>

        {/* Step 6.10 */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-3 text-foreground text-sm">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">6.10</span>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-200 font-mono text-xs">READ</Badge>
              Verify Everything in the Browser
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Open these URLs in your browser to confirm all your changes:</p>
            <div className="space-y-2">
              <BrowserStep step={1} title="See remaining doctors" url="http://127.0.0.1:8000/api/doctors/" description="Should show only Dr. Jane Smith with specialization 'pediatrics' (updated in step 6.7)." />
              <BrowserStep step={2} title="See all patients" url="http://127.0.0.1:8000/api/patients/" description="Should show Alice Johnson." />
              <BrowserStep step={3} title="See all appointments" url="http://127.0.0.1:8000/api/appointments/" description="Should show 1 appointment with status 'completed' (updated in step 6.8)." />
            </div>
          </CardContent>
        </Card>

        {/* Using the Browser Form */}
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-foreground text-sm">
              <Globe className="h-5 w-5 text-primary" />
              Alternative: Use the Browser Form (No Terminal Needed)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Instead of cURL, you can do everything in the browser. Every DRF page has a form at the bottom:
            </p>
            <div className="space-y-3">
              <PostmanStep step={1} text="Go to http://127.0.0.1:8000/api/doctors/ in your browser." />
              <PostmanStep step={2} text="Scroll to the bottom of the page -- you will see input fields (Name, Specialization, Phone, Email)." />
              <PostmanStep step={3} text='Fill in the fields and click the "POST" button to create a new doctor.' />
              <PostmanStep step={4} text="To UPDATE: go to http://127.0.0.1:8000/api/doctors/1/ -- edit the form fields and click PUT." />
              <PostmanStep step={5} text='To DELETE: go to http://127.0.0.1:8000/api/doctors/1/ -- click the red "DELETE" button in the top-right corner.' />
            </div>
            <div className="rounded-lg bg-muted p-4 font-mono text-xs text-foreground leading-relaxed overflow-x-auto">
              {`What you see at http://127.0.0.1:8000/api/doctors/
                     
+--------------------------------------------------+
| Api Root       Doctors List                      |
|                                                  |
| GET /api/doctors/                                |
| HTTP 200 OK                                      |
|                                                  |
| [                                                |
|   { "id": 1, "name": "Dr. Jane Smith", ... }    |
| ]                                                |
|                                                  |
| ──────────────────────────────────────────────── |
|                                                  |
|  Name:           [ Dr. New Doctor             ]  |
|  Specialization: [ dermatology                ]  |
|  Phone:          [ 555-0000                   ]  |
|  Email:          [ new@clinic.com             ]  |
|                                                  |
|                              [ POST ]            |
+--------------------------------------------------+`}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All API Endpoints Reference */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-foreground text-base">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            All API Endpoints Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Doctors */}
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-2">Doctors</h4>
              <div className="space-y-2">
                <EndpointRow method="GET" path="/api/doctors/" description="List all doctors (READ)" />
                <EndpointRow method="POST" path="/api/doctors/" description="Create a doctor (CREATE)" />
                <EndpointRow method="GET" path="/api/doctors/{id}/" description="Get single doctor (READ)" />
                <EndpointRow method="PUT" path="/api/doctors/{id}/" description="Full update (UPDATE)" />
                <EndpointRow method="PATCH" path="/api/doctors/{id}/" description="Partial update (UPDATE)" />
                <EndpointRow method="DELETE" path="/api/doctors/{id}/" description="Delete a doctor (DELETE)" />
              </div>
            </div>

            {/* Patients */}
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-2">Patients</h4>
              <div className="space-y-2">
                <EndpointRow method="GET" path="/api/patients/" description="List all patients (READ)" />
                <EndpointRow method="POST" path="/api/patients/" description="Create a patient (CREATE)" />
                <EndpointRow method="GET" path="/api/patients/{id}/" description="Get single patient (READ)" />
                <EndpointRow method="PUT" path="/api/patients/{id}/" description="Full update (UPDATE)" />
                <EndpointRow method="PATCH" path="/api/patients/{id}/" description="Partial update (UPDATE)" />
                <EndpointRow method="DELETE" path="/api/patients/{id}/" description="Delete a patient (DELETE)" />
              </div>
            </div>

            {/* Appointments */}
            <div>
              <h4 className="font-semibold text-foreground text-sm mb-2">Appointments</h4>
              <div className="space-y-2">
                <EndpointRow method="GET" path="/api/appointments/" description="List all appointments (READ)" />
                <EndpointRow method="POST" path="/api/appointments/" description="Book appointment (CREATE)" />
                <EndpointRow method="GET" path="/api/appointments/{id}/" description="Get appointment detail (READ)" />
                <EndpointRow method="PUT" path="/api/appointments/{id}/" description="Full update (UPDATE)" />
                <EndpointRow method="PATCH" path="/api/appointments/{id}/" description="Partial update (UPDATE)" />
                <EndpointRow method="DELETE" path="/api/appointments/{id}/" description="Cancel appointment (DELETE)" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
