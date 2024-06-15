import { Container, Img } from '@react-email/components';
import { headerStyle } from '@/mailers/_shared/styles';

export default function Header() {
  return (
    <Container style={headerStyle}>
      <Img
        src="https://storage.googleapis.com/pluspayments-public/logo.png"
        style={{ width: '90px', margin: '0 auto' }}
      />
    </Container>
  );
}
