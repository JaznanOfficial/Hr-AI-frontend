import { ResetPasswordTemplate } from "../templates/reset-password";
import { sendEmail } from "./resend";

export async function sendResetPasswordEmail({
	email,
	url,
}: { email: string; url: string }) {
	return sendEmail({
		to: email,
		subject: "Reset your password",
		text: `Click the link to reset your password: ${url}`,
		html: ResetPasswordTemplate(url),
	});
}
