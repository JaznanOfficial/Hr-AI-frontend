import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./index";
import { account, session, user, verification } from "./schema/auth";

import { sendResetPasswordEmail } from "@/email/config/forget-email";

export const auth = betterAuth({
    baseURL: process.env.NEXT_PUBLIC_APP_URL as string,
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
            user,
            session,
            account,
            verification
        },
	}),
	emailAndPassword: {
		enabled: true,
        async sendResetPassword(data) {
            await sendResetPasswordEmail({
                email: data.user.email,
                url: data.url
            });
        }
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
});
