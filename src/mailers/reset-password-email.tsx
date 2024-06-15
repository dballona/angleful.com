import { sendEmail } from '@/lib/mail';
import {
  Html,
  Body,
  Container,
  Text,
  Heading,
  Button,
} from '@react-email/components';
import {
  htmlStyle,
  bodyStyle,
  containerStyle,
  paragraphStyle,
  buttonStyle,
  headingStyle,
} from '@/mailers/_shared/styles';
import Header from '@/mailers/_shared/header';
import Footer from '@/mailers/_shared/footer';

interface ResetPasswordEmailProps {
  to: string;
  firstName: string;
  resetPasswordToken: string;
}

function getResetPasswordUrl(resetPasswordToken: string) {
  return `${process.env.SITE_URL}/password-reset/${resetPasswordToken}`;
}

export async function sendResetPasswordEmail(
  options: ResetPasswordEmailProps,
): Promise<void> {
  const body = (
    <Html style={htmlStyle}>
      <Body style={bodyStyle}>
        <Header />
        <Container style={containerStyle}>
          <Heading style={headingStyle}>
            Forgot your password, {options.firstName}?
          </Heading>
          <Text style={paragraphStyle}>
            We received a request to reset your password.
          </Text>
          <Text style={paragraphStyle}>
            If you didn&apos;t make this request you can safely ignore this
            email. Otherwise, click here to reset your password:
          </Text>
          <Button
            href={getResetPasswordUrl(options.resetPasswordToken)}
            style={buttonStyle}
          >
            Reset my Password
          </Button>
        </Container>
        <Footer />
      </Body>
    </Html>
  );

  await sendEmail({
    from: 'Plus Payments <support@pluspayments.com>',
    to: [options.to],
    subject: `Plus Payments: Reset your password`,
    body: body,
  });
}
