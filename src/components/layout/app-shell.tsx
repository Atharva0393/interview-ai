"use client";

import React from "react";
import { AppSidebar } from "./app-sidebar";
import { MobileNavigation } from "./mobile-navigation";
import { PageHeader } from "./page-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#f5f4f1] text-slate-900 flex flex-col lg:flex-row relative selection:bg-stone-800 selection:text-white font-sans">
      {/* Desktop Workspace Sidebar Navigation */}
      <AppSidebar />

      {/* Mobile Top Navigation */}
      <MobileNavigation />

      {/* Main Content Workspace Canvas */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#f5f4f1] relative">
        <PageHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
