"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { userSchema } from "@/features/users/types/userSchema";
import type { FormType } from "@/features/users/types/userSchema";
import type { SubmitHandler } from "react-hook-form";
import { userService } from "@/features/users/service/users.service";

const Login = () => {
	const form = useForm<FormType>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FormType> = async (data) => {
		try {
			const parsed = userSchema.parse(data);

			await userService.getUser({
				username: parsed.username,
				password: parsed.password,
			});

			form.reset();
		} catch (error) {
			form.setError("root", {
				type: "server",
				message:
					"No se pudo realizar el registro. " +
					(error instanceof Error ? error : ""),
			});
		}
	};

	return (
		<div className="form-container">
			<Form {...form}>
				<form className="form-content" onSubmit={form.handleSubmit(onSubmit)}>
					<div>
						<Label htmlFor="username">Nombre de Usuario</Label>
						<Input
							id="username"
							type="text"
							{...form.register("username", {
								onChange: () => form.clearErrors("root"),
							})}
						/>
						{form.formState.errors.username && (
							<p className="text-red-500 text-sm">
								{form.formState.errors.username.message}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="password">Contraseña</Label>
						<Input
							id="password"
							type="password"
							{...form.register("password", {
								onChange: () => form.clearErrors("root"),
							})}
						/>
						{form.formState.errors.password && (
							<p className="text-red-500 text-sm">
								{form.formState.errors.password.message}
							</p>
						)}
					</div>
					<div>
						{form.formState.errors.root && (
							<p className="text-red-600 text-sm">
								{form.formState.errors.root.message}
							</p>
						)}
						<span>
							<Button type="submit">Login</Button>
							<Button variant="outline" type="button">
								<Link
									to="/login/signin"
									className="text-blue-500 underline text-sm"
								>
									Sign Up
								</Link>
							</Button>
						</span>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default Login;
