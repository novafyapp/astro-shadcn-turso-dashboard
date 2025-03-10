/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

import type { Session as AuthSession, User as AuthUser } from "better-auth";
import type { LucideIcon } from "lucide-react";

declare global {
	type User = AuthUser;
	type Session = AuthSession;

	interface Organization {
		id: string;
		name: string;
		slug: string;
		logo?: string | null;
		plan?: string;
	}

	interface Member {
		user?: User;
		id: string;
		organizationId: string;
		userId: string;
		role: UserRole;
		createdAt: Date;
	};

	interface OrganizationAndMember extends Organization {
		Member: Member | null;
	}

	namespace App {
		interface Locals {
			user: User | null;
			session: Session | null;
		}
	}

	interface SiteConfig {
		name: string;
		description: string;
		url: string;
		ogImage: string;
		mailSupport: string;
		author: string;
		themeColor: string;
		links: {
			twitter: string;
			github: string;
		};
	}

	type NavIcon = LucideIcon | IconType;

	interface NavItem {
		title: string;
		href?: string;
		badge?: number;
		disabled?: boolean;
		external?: boolean;
		authorizeOnly?: UserRole;
		icon?: NavIcon;
	}

	interface MainNavItem extends NavItem { }

	interface MarketingConfig {
		mainNav: MainNavItem[];
	}

	type UserRole = "admin" | "user";

	interface AuthConfig {
		callbackURL: string;
	}

	interface Window {
		getThemePreference: () => "light" | "dark" | "system";
		setThemePreference: (theme: "light" | "dark" | "system") => void;
	}

	interface NavItemWithSubItems extends NavItem {
		items?: NavItemWithSubItems[];
		isActive?: boolean;
	}


	interface PageData {
		currentOrganization: OrganizationAndMember | null;
		user: User | null;
		session: Session | null;
		currentPath: string;
		redirect: string | null;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		member: any | null;
	}

}

export interface ImportMetaEnv {
	readonly ASTRO_DB_REMOTE_URL: string;
	readonly ASTRO_DB_APP_TOKEN: string;
	readonly BETTER_AUTH_SECRET: string;
	readonly BETTER_AUTH_URL: string;
	readonly APP_NAME: string;
	readonly APP_ORGANIZATION: string;
	readonly APP_PRIMARY_LOCATION: string;
	readonly APP_GROUP: string;
	readonly RESEND_API_KEY: string;
}

export interface ImportMeta {
	readonly env: ImportMetaEnv;
}
