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

interface ForgotPasswordFormProps
	extends React.ComponentPropsWithoutRef<"div"> {
	onSubmit: (e: React.FormEvent) => Promise<void>;
	email?: string;
	onEmailChange?: (value: string) => void;
	errorMessage?: string;
	isSubmitted?: boolean;
}

export function ForgotPasswordForm({
	className,
	onSubmit,
	email = "",
	onEmailChange,
	errorMessage,
	isSubmitted = false,
	...props
}: ForgotPasswordFormProps) {
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Reset your password</CardTitle>
					<CardDescription>
						Enter your email address and we'll send you a link to reset your
						password
					</CardDescription>
				</CardHeader>
				<CardContent>
					{isSubmitted ? (
						<div className="text-center space-y-4">
							<p className="text-sm text-muted-foreground">
								If an account exists for {email}, you will receive a password
								reset email shortly.
							</p>
							<Button variant="outline" className="w-full" asChild>
								<a href="/login">Return to login</a>
							</Button>
						</div>
					) : (
						<form onSubmit={onSubmit}>
							<div className="grid gap-4">
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
								{errorMessage && (
									<p className="text-sm text-destructive">{errorMessage}</p>
								)}
								<Button type="submit" className="w-full">
									Send reset link
								</Button>
								<Button variant="outline" className="w-full" asChild>
									<a href="/login">Back to login</a>
								</Button>
							</div>
						</form>
					)}
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
				By clicking continue, you agree to our{" "}
				<a href="/terms">Terms of Service</a> and{" "}
				<a href="/privacy">Privacy Policy</a>.
			</div>
		</div>
	);
}
