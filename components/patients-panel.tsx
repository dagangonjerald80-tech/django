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
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import type { Patient } from "@/lib/store";

const GENDERS = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
  { value: "O", label: "Other" },
];

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const emptyForm = {
  name: "",
  age: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
};

export function PatientsPanel() {
  const { data: patients = [], isLoading } = useSWR<Patient[]>(
    "/api/patients",
    fetcher
  );
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingPatient, setDeletingPatient] = useState<Patient | null>(null);

  const handleSubmit = async () => {
    if (!form.name || !form.age || !form.gender || !form.phone || !form.email)
      return;

    const payload = { ...form, age: parseInt(form.age) };

    if (editingId) {
      await fetch(`/api/patients/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setForm(emptyForm);
    setEditingId(null);
    setDialogOpen(false);
    mutate("/api/patients");
    mutate("/api/appointments");
  };

  const handleEdit = (patient: Patient) => {
    setForm({
      name: patient.name,
      age: String(patient.age),
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email,
      address: patient.address,
    });
    setEditingId(patient.id);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingPatient) return;
    await fetch(`/api/patients/${deletingPatient.id}`, { method: "DELETE" });
    setDeleteDialogOpen(false);
    setDeletingPatient(null);
    mutate("/api/patients");
    mutate("/api/appointments");
  };

  const confirmDelete = (patient: Patient) => {
    setDeletingPatient(patient);
    setDeleteDialogOpen(true);
  };

  const getGenderLabel = (value: string) =>
    GENDERS.find((g) => g.value === value)?.label || value;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading patients...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Patients</h2>
          <p className="text-sm text-muted-foreground">
            {patients.length} patient{patients.length !== 1 ? "s" : ""}{" "}
            registered
          </p>
        </div>
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setForm(emptyForm);
              setEditingId(null);
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card text-card-foreground">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editingId ? "Update Patient" : "Add New Patient"}
              </DialogTitle>
              <DialogDescription>
                {editingId
                  ? "Update the patient's information below."
                  : "Fill in the details to register a new patient."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="p-name" className="text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="p-name"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="p-age" className="text-foreground">
                    Age
                  </Label>
                  <Input
                    id="p-age"
                    type="number"
                    placeholder="30"
                    min={0}
                    max={150}
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p-gender" className="text-foreground">
                  Gender
                </Label>
                <Select
                  value={form.gender}
                  onValueChange={(val) => setForm({ ...form, gender: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENDERS.map((g) => (
                      <SelectItem key={g.value} value={g.value}>
                        {g.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="p-phone" className="text-foreground">
                    Phone
                  </Label>
                  <Input
                    id="p-phone"
                    placeholder="(555) 123-4567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="p-email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="p-email"
                    type="email"
                    placeholder="patient@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="p-address" className="text-foreground">
                  Address
                </Label>
                <Textarea
                  id="p-address"
                  placeholder="123 Main St, City"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
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
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingId ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {patients.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12">
          <Users className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground">
            No patients yet
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Register your first patient to get started.
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
                  Name
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Age
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Gender
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Phone
                </TableHead>
                <TableHead className="text-foreground font-semibold">
                  Email
                </TableHead>
                <TableHead className="text-foreground font-semibold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {patient.id}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {patient.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {patient.age}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-accent-foreground bg-accent">
                      {getGenderLabel(patient.gender)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {patient.phone}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {patient.email}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(patient)}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit patient</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDelete(patient)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete patient</span>
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
              Delete Patient
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {deletingPatient?.name}? This will
              also remove all their appointments. This action cannot be undone.
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
