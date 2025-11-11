import React from 'react';

const Footer = () => {
  const phoneNumber = "5514991723770";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <footer className="w-full py-4 mt-12 bg-muted/50">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>Desenvolvido por Ana Magotti</p>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
          Contato: (14) 99172-3770
        </a>
      </div>
    </footer>
  );
};

export default Footer;
