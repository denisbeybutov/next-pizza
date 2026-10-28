import { Resend } from 'resend';
import React from 'react';
import { VerificationUserTemplate } from '@/shared/components/shared/email-templates/verification-user';

export const sendVerificationEmail = async (
  to: string,
  code: string,
) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: 'Next Pizza / 📝 Подтверждение регистрации',
    react: React.createElement(VerificationUserTemplate, { code }),
  });

  if (error) {
    console.error('[Send Verification Email] Resend error:', error);
    throw new Error(error.message);
  }

  return data;
};