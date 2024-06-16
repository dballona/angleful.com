import { Container, Text } from '@react-email/components';
import { footerStyle } from '@/mailers/_shared/styles';

export default function Footer() {
  return (
    <Container style={footerStyle}>
      <Text>
        This e-mail contains information that may be confidential. It is
        intended solely for the addressee. Access to this e-mail by anyone else
        is unauthorized, and any disclosure, copying, use, or distribution of
        the information included in this e-mail and any attachments is strictly
        prohibited.
      </Text>
    </Container>
  );
}
