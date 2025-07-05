import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#343a40',
        color: 'white',
        padding: '1rem 0',
        textAlign: 'center',
        marginTop: 'auto'
      }}
    >
      <Container>
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} My React Store. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;