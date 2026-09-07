"use client";

import React from "react";
import { AppSidebar } from "./app-sidebar";
import { MobileNavigation } from "./mobile-navigation";
import { PageHeader } from "./page-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#121212] text-slate-900 flex flex-col lg:flex-row relative selection:bg-stone-800 selection:text-white p-0 lg:p-3.5 gap-0 lg:gap-3.5 font-sans">
      {/* Soft atmospheric ambient lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none -z-10" />

      {/* Desktop Workspace Sidebar Navigation */}
      <AppSidebar />

      {/* Mobile Top Navigation */}
      <MobileNavigation />

      {/* Main Content Workspace Canvas */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen lg:min-h-[calc(100vh-1.75rem)] bg-[#f5f4f1] lg:rounded-[32px] border-t lg:border border-stone-200/50 shadow-2xl overflow-hidden relative">
        <PageHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
