type LayoutProps = {
  className?: string;
  children: React.ReactNode;
};

const Layout = ({ className, children }: LayoutProps) => {
  return (
    <div className={`w-11/12 xl:w-[1200px] mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Layout;
