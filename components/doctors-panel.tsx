"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Pencil, Trash2, Stethoscope } from "lucide-react";
import type { Doctor } from "@/lib/store";

const SPECIALIZATIONS = [
  { value: "general", label: "General Practice" },
  { value: "cardiology", label: "Cardiology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "neurology", label: "Neurology" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "psychiatry", label: "Psychiatry" },
  { value: "surgery", label: "Surgery" },
];

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const emptyForm = {
  name: "",
  specialization: "",
  phone: "",
  email: "",
};

export function DoctorsPanel() {
  const { data: doctors = [], isLoading } = useSWR<Doctor[]>(
    "/api/doctors",
    fetcher
  );
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingDoctor, setDeletingDoctor] = useState<Doctor | null>(null);

  const handleSubmit = async () => {
    if (!form.name || !form.specialization || !form.phone || !form.email)
      return;

    if (editingId) {
      // UPDATE (PUT)
      await fetch(`/api/doctors/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      // CREATE (POST)
      await fetch("/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm(emptyForm);
    setEditingId(null);
    setDialogOpen(false);
    mutate("/api/doctors");
    mutate("/api/appointments");
  };

  const handleEdit = (doctor: Doctor) => {
    setForm({
      name: doctor.name,
      specialization: doctor.specialization,
      phone: doctor.phone,
      email: doctor.email,
    });
    setEditingId(doctor.id);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingDoctor) return;
    await fetch(`/api/doctors/${deletingDoctor.id}`, { method: "DELETE" });
    setDeleteDialogOpen(false);
    setDeletingDoctor(null);
    mutate("/api/doctors");
    mutate("/api/appointments");
  };

  const confirmDelete = (doctor: Doctor) => {
    setDeletingDoctor(doctor);
    setDeleteDialogOpen(true);
  };

  const getSpecLabel = (value: string) =>
    SPECIALIZATIONS.find((s) => s.value === value)?.label || value;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground">Loading doctors...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Doctors</h2>
          <p className="text-sm text-muted-foreground">
            {doctors.length} doctor{doctors.length !== 1 ? "s" : ""} registered
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
              Add Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card text-card-foreground">
            <DialogHeader>
              <DialogTitle className="text-foreground">
                {editingId ? "Update Doctor" : "Add New Doctor"}
              </DialogTitle>
              <DialogDescription>
                {editingId
                  ? "Update the doctor's information below."
                  : "Fill in the details to register a new doctor."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Dr. John Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="specialization" className="text-foreground">
                  Specialization
                </Label>
                <Select
                  value={form.specialization}
                  onValueChange={(val) =>
                    setForm({ ...form, specialization: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPECIALIZATIONS.map((spec) => (
                      <SelectItem key={spec.value} value={spec.value}>
                        {spec.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-foreground">
                  Phone
                </Label>
                <Input
                  id="phone"
                  placeholder="(555) 123-4567"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="doctor@clinic.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
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

      {doctors.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12">
          <Stethoscope className="mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="text-lg font-medium text-foreground">
            No doctors yet
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Add your first doctor to get started.
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
                  Specialization
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
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {doctor.id}
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    Dr. {doctor.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-accent-foreground bg-accent">
                      {getSpecLabel(doctor.specialization)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {doctor.phone}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {doctor.email}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(doctor)}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit doctor</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDelete(doctor)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete doctor</span>
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
              Delete Doctor
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete Dr. {deletingDoctor?.name}? This
              will also remove all their appointments. This action cannot be
              undone.
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
