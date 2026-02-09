"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, CalendarDays } from "lucide-react";
import type { Doctor, Patient, Appointment } from "@/lib/store";

const STATUS_OPTIONS = [
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no_show", label: "No Show" },
];

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const emptyForm = {
  doctor: "",
  patient: "",
  date: "",
  time: "",
  status: "scheduled",
  notes: "",
};

export function AppointmentsPanel() {
  const { data: appointments = [], isLoading: loadingAppts } = useSWR<
    Appointment[]
  >("/api/appointments", fetcher);
  const { data: doctors = [] } = useSWR<Doctor[]>("/api/doctors", fetcher);
  const { data: patients = [] } = useSWR<Patient[]>("/api/patients", fetcher);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingAppt, setDeletingAppt] = useState<Appointment | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.doctor || !form.patient || !form.date || !form.time) return;
    setError("");

    const url = editingId
      ? `/api/appointments/${editingId}`
      : "/api/appointments";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setForm(emptyForm);
    setEditingId(null);
    setDialogOpen(false);
    mutate("/api/appointments");
  };

  const handleEdit = (appt: Appointment) => {
    setForm({
      doctor: String(appt.doctor),
      patient: String(appt.patient),
      date: appt.date,
      time: appt.time,
      status: appt.status,
      notes: appt.notes,
    });
    setEditingId(appt.id);
    setError("");
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingAppt) return;
    await fetch(`/api/appointments/${deletingAppt.id}`, { method: "DELETE" });
    setDeleteDialogOpen(false);
    setDeletingAppt(null);
    mutate("/api/appointments");
  };

  const confirmDelete = (appt: Appointment) => {
    setDeletingAppt(appt);
    setDeleteDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-primary/15 text-primary border-primary/20";
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "no_show":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "";
    }
  };

  const getStatusLabel = (value: string) =>
    STATUS_OPTIONS.find((s) => s.value === value)?.label || value;

  if (loadingAppts) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading appointments...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Appointments
          </h2>
          <p className="text-sm text-muted-foreground">
            {appointments.length} appointment
            {appointments.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setForm(emptyForm);
              setEditingId(null);
              setError("");
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card text-card-foreground">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editingId ? "Update Appointment" : "Book New Appointment"}
              </DialogTitle>
              <DialogDescription>
                {editingId
                  ? "Update the appointment details below."
                  : "Select a doctor and patient, then choose a date and time."}
              </DialogDescription>
            </DialogHeader>
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="a-doctor" className="text-foreground">
                  Doctor
                </Label>
                <Select
                  value={form.doctor}
                  onValueChange={(val) => setForm({ ...form, doctor: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((d) => (
                      <SelectItem key={d.id} value={String(d.id)}>
                        Dr. {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="a-patient" className="text-foreground">
                  Patient
                </Label>
                <Select
                  value={form.patient}
                  onValueChange={(val) => setForm({ ...form, patient: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((p) => (
                      <SelectItem key={p.id} value={String(p.id)}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="a-date" className="text-foreground">
                    Date
                  </Label>
                  <Input
                    id="a-date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="a-time" className="text-foreground">
                    Time
                  </Label>
                  <Input
                    id="a-time"
                    type="time"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="a-status" className="text-foreground">
                  Status
                </Label>
                <Select
                  value={form.status}
                  onValueChange={(val) => setForm({ ...form, status: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="a-notes" className="text-foreground">
                  Notes
                </Label>
                <Textarea
                  id="a-notes"
                  placeholder="Additional notes..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  setForm(emptyForm);
                  setEditingId(null);
                  setError("");
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingId ? "Update" : "Book"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12">
          <CalendarDays className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground">
            No appointments yet
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Book your first appointment to get started.
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-foreground font-semibold">
                  ID
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Doctor
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Patient
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Date
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Time
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Status
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Notes
                </TableHead>
                <TableHead className="text-foreground font-semibold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {appt.id}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    Dr. {appt.doctor_name}
                  </TableCell>
                  <TableCell className="text-foreground">
                    {appt.patient_name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {appt.date}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {appt.time}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(appt.status)}
                    >
                      {getStatusLabel(appt.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-muted-foreground">
                    {appt.notes || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(appt)}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit appointment</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDelete(appt)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete appointment</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Delete Appointment
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this appointment
              {deletingAppt?.doctor_name &&
                ` with Dr. ${deletingAppt.doctor_name}`}
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
