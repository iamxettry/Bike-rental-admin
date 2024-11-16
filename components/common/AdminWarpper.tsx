import React from "react";

const AdminWarpper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`bg-gradient-to-tr from-blue-100 to-pink-100 w-full p-4  rounded-md ${className}`}
    >
      {children}
    </div>
  );
};

export default AdminWarpper;
