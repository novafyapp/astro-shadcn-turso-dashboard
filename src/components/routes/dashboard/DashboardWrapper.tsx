"use client";

import { DashboardHeader } from "@/components/routes/dashboard/DashboardHeader";
import { AppSidebar } from "@/components/shadcn/app-sidebar";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

interface DashboardWrapperProps {
	currentPath?: string;
	currentOrganization?: OrganizationAndMember;
	currentUser?: User;
	children: React.ReactNode;
}

export function DashboardWrapper({
	currentPath,
	currentOrganization,
	currentUser,
	children,
}: DashboardWrapperProps) {
	return (
		<SidebarProvider>
			<AppSidebar
				currentOrganization={currentOrganization}
				currentUser={currentUser}
			/>
			<SidebarInset>
				<DashboardHeader />
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
