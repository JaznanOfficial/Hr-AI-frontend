import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
	to: string;
	subject: string;
	text?: string;
	html?: string;
    from?: string;
}

export async function sendEmail({ to, subject, text, html, from: fromOverride }: SendEmailParams) {
	if (!process.env.RESEND_API_KEY) {
		console.warn(
			"RESEND_API_KEY is not defined. Email will not be sent (logged only).",
		);
		console.log(`[Email Mock] To: ${to}, Subject: ${subject}`);
        if(text) console.log(`[Body] ${text}`);
		return { success: true, id: "mock-id" };
	}

    const from = fromOverride || process.env.EMAIL_FROM || "onboarding@resend.dev";

	try {
		const { data, error } = await resend.emails.send({
			from,
			to,
			subject,
			text: text || "",
            html: html,
		});

		if (error) {
			console.error("Resend Error:", error);
			return { success: false, error };
		}

		return { success: true, id: data?.id };
	} catch (error) {
		console.error("Email Sending Exception:", error);
		return { success: false, error };
	}
}
