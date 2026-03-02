"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { userToken } from "@/features/users/types/userSchema";
import type { TokenType } from "@/features/users/types/userSchema";
import type { SubmitHandler } from "react-hook-form";
import { userService } from "@/features/users/service/users.service";
import { useNavigate } from "react-router";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const Token = () => {
	const navigate = useNavigate();

	const form = useForm<TokenType>({
		resolver: zodResolver(userToken),
		defaultValues: {
			token: "",
		},
	});

	const onSubmit: SubmitHandler<TokenType> = async (data) => {
		try {
			const parsed = userToken.parse(data);

			const token = await userService.getToken({
				token: parsed.token,
			});

			if (token) {
				form.reset();
				navigate("/login/signup");
			} else {
				form.setError("root", {
					type: "server",
					message: "No se pudo realizar la verificación.",
				});
			}
		} catch (error) {
			form.setError("root", {
				type: "server",
				message:
					"No se pudo realizar la verificación. " +
					(error instanceof Error ? error : ""),
			});
		}
	};

	return (
		<div className="form-container-otp">
			<Form {...form}>
				<form className="form-content" onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="token"
						render={({ field }) => (
							<FormItem className="justify-center">
								<FormLabel>Token</FormLabel>
								<FormControl>
									<InputOTP maxLength={6} {...field}>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
										</InputOTPGroup>
										<InputOTPSeparator />
										<InputOTPGroup>
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
								{form.formState.errors.root && (
									<p className="text-red-500 text-sm">
										{form.formState.errors.root.message}
									</p>
								)}
								<span>
									<Button type="submit">Enviar</Button>
								</span>
							</FormItem>
						)}
					/>
				</form>
			</Form>
		</div>
	);
};

export default Token;
