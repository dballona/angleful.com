import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('$RESEND_API_KEY not set.');
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  to: string[];
  from: string;
  replyTo?: string[];
  subject: string;
  body: JSX.Element;
}

export async function sendEmail(options: SendEmailProps): Promise<void> {
  const { error } = await resend.emails.send({
    from: options.from,
    to: options.to,
    reply_to: options.replyTo,
    subject: options.subject,
    react: options.body,
  });

  if (error) throw error;
}
