const purple = '#7f4cff';

const white = '#f9fcff';
const grey50 = '#f9fafb';
const grey100 = '#f3f4f6';
const grey200 = '#e5e7eb';
const grey300 = '#d1d5db';
const grey400 = '#9ca3af';
const grey500 = '#6b7280';
const grey600 = '#4b5563';
const grey700 = '#374151';
const grey800 = '#1f2937';
const grey900 = '#111827';
const grey950 = '#030712';
const black = '#020617';

export const htmlStyle = {
  fontSize: '15px',
};

export const bodyStyle = {
  padding: `4rem 0`,
  fontWeight: '300',
  background: grey100,
};

export const headerStyle = {
  margin: '0 auto',
  padding: '2rem',
  width: '35rem',
  maxWidth: '100%',
  background: black,
};

export const containerStyle = {
  margin: '0 auto',
  padding: `2rem`,
  width: '35rem',
  maxWidth: '100%',
  backgroundColor: white,
};

export const footerStyle = {
  margin: '0 auto',
  padding: `0 2rem`,
  width: '35rem',
  maxWidth: '100%',
  fontSize: '.75rem',
  color: grey400,
  lineHeight: '.8rem',
  fontStyle: 'italic',
};

export const headingStyle = {
  fontSize: '1.6rem',
  lineHeight: '1.3',
  fontWeight: '500',
  color: black,
  marginTop: '0',
};

export const paragraphStyle = {
  fontSize: '1rem',
  lineHeight: '1.4',
  color: grey700,
};

export const highlightStyle = {
  ...paragraphStyle,
  padding: '1rem 2rem',
  border: `1px solid ${grey300}`,
};

export const buttonStyle = {
  fontWeight: '500',
  background: grey100,
  padding: '.5rem 1rem .6rem',
  borderRadius: '10rem',
  fontSize: '1rem',
  border: `1px solid ${grey400}`,
  borderBottom: `2px solid ${grey500}`,
  borderRight: `2px solid ${grey500}`,
  textDecoration: 'none',
  color: black,
  cursor: 'pointer',
  display: 'inline-block',
  lineHeight: '1.5rem',
  whiteSpace: 'nowrap',
  margin: '.5rem 0',
};

export const linkStyle = {
  ...paragraphStyle,
  color: purple,
  display: 'inline-block',
};
