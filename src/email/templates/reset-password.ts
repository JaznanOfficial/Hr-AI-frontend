export const ResetPasswordTemplate = (url: string) => `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>Reset Your Password</h2>
    <p>You requested to reset your password. Click the button below to proceed:</p>
    <a href="${url}" style="background-color: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 16px 0;">Reset Password</a>
    <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
</div>
`;
