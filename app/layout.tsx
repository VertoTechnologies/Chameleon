import React, { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <body>
    <div>
      <header>
        {/* Header content goes here */}
      </header>
      <main>{children}</main>
      <footer>
        {/* Footer content goes here */}
      </footer>
    </div>
    </body>
    </html>
  );
};

export default Layout;