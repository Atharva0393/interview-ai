"use client";

import React from "react";
import { AppSidebar } from "./app-sidebar";
import { MobileNavigation } from "./mobile-navigation";
import { PageHeader } from "./page-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f9f8f6] text-slate-900 flex flex-col lg:flex-row relative selection:bg-violet-100 selection:text-violet-900">
      {/* Soft ambient background warmth */}
      <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-violet-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-stone-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Desktop Workspace Sidebar Navigation */}
      <AppSidebar />

      {/* Mobile Top Navigation */}
      <MobileNavigation />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <PageHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
