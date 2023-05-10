interface Props {
  children: JSX.Element | string;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50">
      {children}
    </div>
  );
};

export default Layout;
