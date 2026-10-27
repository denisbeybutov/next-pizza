import { Resend } from 'resend';
import React from 'react';
import { PayOrderTemplate } from '@/shared/components/shared/email-templates/pay-order';

export const sendEmail = async (
  to: string,
  subject: string,
  params: {
    orderId: number;
    totalAmount: number;
    paymentUrl: string;
  },
) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject,
    react: React.createElement(PayOrderTemplate, params),
  });

  if (error) {
    console.error('[Send Email] Resend error:', error);
    throw new Error(error.message);
  }

  console.log('[Send Email] Success:', data);
  return data;
};