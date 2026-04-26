"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import AppointmentDialog from "@/components/home/AppointmentDialog";

interface AppointmentContextType {
  openAppointmentDialog: (doctorName?: string) => void;
  closeAppointmentDialog: () => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [doctorName, setDoctorName] = useState("");

  const openAppointmentDialog = (name = "") => {
    setDoctorName(name);
    setIsOpen(true);
  };

  const closeAppointmentDialog = () => {
    setIsOpen(false);
  };

  return (
    <AppointmentContext.Provider value={{ openAppointmentDialog, closeAppointmentDialog }}>
      {children}
      <AppointmentDialog 
        isOpen={isOpen} 
        onOpenChange={setIsOpen} 
        doctorName={doctorName} 
      />
    </AppointmentContext.Provider>
  );
}

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointment must be used within an AppointmentProvider");
  }
  return context;
}
