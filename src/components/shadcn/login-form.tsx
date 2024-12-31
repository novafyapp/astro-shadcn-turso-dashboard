import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
	onSubmit: (e: React.FormEvent) => Promise<void>;
	email?: string;
	password?: string;
	onEmailChange?: (value: string) => void;
	onPasswordChange?: (value: string) => void;
	errorMessage?: string;
	needsVerification?: boolean;
	onResendVerification?: (sendVerification: boolean) => void;
	isResending?: boolean;
	countdown?: number;
	isLoading?: boolean;
}

export function LoginForm({
	className,
	onSubmit,
	email = "",
	password = "",
	onEmailChange,
	onPasswordChange,
	errorMessage,
	needsVerification,
	onResendVerification,
	isResending,
	countdown,
	isLoading,
	...props
}: LoginFormProps) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					<CardDescription>
						Login with your Apple or Google account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit}>
						<div className="grid gap-6">
							<div className="flex flex-col gap-4">
								<Button variant="outline" className="w-full">
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<title>Google</title>
										<path
											d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
											fill="currentColor"
										/>
									</svg>
									Login with Google
								</Button>
							</div>
							<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
								<span className="relative z-10 bg-background px-2 text-muted-foreground">
									Or continue with
								</span>
							</div>
							<div className="grid gap-6">
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="m@example.com"
										required
										value={email}
										onChange={(e) => onEmailChange?.(e.target.value)}
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										type="password"
										required
										value={password}
										onChange={(e) => onPasswordChange?.(e.target.value)}
									/>
									<a
										href="/forgot-password"
										className="text-sm text-right underline-offset-4 hover:underline"
									>
										Forgot your password?
									</a>
								</div>
								{errorMessage && (
									<p className="text-sm text-destructive">{errorMessage}</p>
								)}
								<Button type="submit" className="w-full" loading={isLoading}>
									Login
								</Button>
							</div>
							<div className="text-center text-sm">
								Don&apos;t have an account?{" "}
								<a href="/signup" className="underline underline-offset-4">
									Sign up
								</a>
							</div>
							{needsVerification && (
								<div className="text-center text-sm">
									<p className="text-muted-foreground">
										Please verify your email address. A verification email has
										been sent.
									</p>
									<Button
										type="button"
										variant="outline"
										className="mt-2"
										onClick={() => onResendVerification?.(true)}
										disabled={isResending || (countdown ?? 0) > 0}
									>
										{isResending
											? "Sending..."
											: (countdown ?? 0) > 0
												? `Resend available in ${countdown}s`
												: "Resend verification email"}
									</Button>
								</div>
							)}
						</div>
					</form>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground">
				By clicking continue, you agree to our{" "}
				<a
					href="/terms"
					className="underline underline-offset-4 hover:text-primary"
				>
					Terms of Service
				</a>{" "}
				and{" "}
				<a
					href="/privacy"
					className="underline underline-offset-4 hover:text-primary"
				>
					Privacy Policy
				</a>
				.
			</div>
		</div>
	);
}
