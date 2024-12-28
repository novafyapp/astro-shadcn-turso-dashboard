import { LibsqlDialect } from "@libsql/kysely-libsql";
import { betterAuth } from "better-auth";
import { admin, emailOTP, magicLink, organization, phoneNumber, twoFactor } from "better-auth/plugins";
import { mailConfig } from "config";
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY);

function getDatabaseUrl() {
	if (import.meta.env.DEV) {
		// Use local Astro DB in development
		return 'file:./.astro/content.db'
	}
	// Use remote database in production
	return import.meta.env.ASTRO_DB_REMOTE_URL || process.env.ASTRO_DB_REMOTE_URL
}

export const auth = betterAuth({
	database: {
		dialect: new LibsqlDialect({
			url: getDatabaseUrl(),
			// Only include authToken for remote database
			...(import.meta.env.DEV
				? {}
				: { authToken: import.meta.env.ASTRO_DB_APP_TOKEN || process.env.ASTRO_DB_APP_TOKEN }
			),
		}),
		type: "sqlite",
		// schema: {
		// 	usersTable: "users",
		// 	sessionsTable: "sessions",
		// 	userColumns: {
		// 		role: "text",
		// 	},
		// },
	},
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ["google"],
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		verificationEmailURL: "/account-confirmed",
		sendVerificationEmail: async ({ user, url, token }, request) => {
			await resend.emails.send({
				from: mailConfig.from,
				to: user.email,
				subject: "Verify your email",
				html: `Click this link to verify your account: <a href="${url}">${url}</a>`,
			});
		}
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url, token }, request) => {
			await resend.emails.send({
				from: mailConfig.from,
				to: user.email,
				subject: "Reset your password",
				html: `Click this link to reset your password: <a href="${url}">${url}</a>`,
			});
		}
	},
	plugins: [
		phoneNumber({
			sendOTP: ({ phoneNumber, code }, request) => {
				// Implement sending OTP code via SMS
			},
			signUpOnVerification: {
				getTempEmail: (phoneNumber) => {
					return `${phoneNumber}@my-site.com`
				},
				//optionally you can alos pass `getTempName` function to generate a temporary name for the user
				getTempName: (phoneNumber) => {
					return phoneNumber //by default it will use the phone number as the name
				}
			}
		}),
		emailOTP({
			async sendVerificationOTP({
				email,
				otp,
				type
			}) {
				if (type === "sign-in") {
					// Send the OTP for sign-in
				} else if (type === "email-verification") {
					// Send the OTP for email verification
				} else {
					// Send the OTP for password reset
				}
			},
		}),
		magicLink({
			sendMagicLink: async ({ email, token, url }, request) => {
				// send email to user
			}
		}),
		organization({
			async sendInvitationEmail(data) {
				const res = await resend.emails.send({
					from: mailConfig.from,
					to: data.email,
					subject: "You've been invited to join an organization",
					html: `You've been invited to join an organization:`,
					// react: reactInvitationEmail({
					// 	username: data.email,
					// 	invitedByUsername: data.inviter.user.name,
					// 	invitedByEmail: data.inviter.user.email,
					// 	teamName: data.organization.name,
					// 	inviteLink:
					// 		process.env.NODE_ENV === "development"
					// 			? `http://localhost:3000/accept-invitation/${data.id}`
					// 			: `${
					// 					process.env.BETTER_AUTH_URL ||
					// 					"https://demo.better-auth.com"
					// 				}/accept-invitation/${data.id}`,
					// }),
				});
			},
			allowUserToCreateOrganization: async (user) => {
				// const subscription = await getSubscription(user.id)
				// return subscription.plan === "pro"
				return true
			}
		}),
		admin(),
		twoFactor({
			otpOptions: {
				async sendOTP({ user, otp }, request) {
					console.log(`Sending OTP to ${user.email}: ${otp}`);
					await resend.emails.send({
						from: mailConfig.from,
						to: user.email,
						subject: "Your OTP",
						html: `Your OTP is ${otp}`,
					});
				},
			},
		}),
	],
	rateLimit: {
		enabled: true,
	},
});

export async function userCanAccessResource(user: User | null, resource: URL) {
	// Check if the user has access to the resource
	return true;
}
