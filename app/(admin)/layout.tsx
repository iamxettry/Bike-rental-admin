import Main from "@/components/Main";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Main>{children}</Main>;
};

export default layout;
