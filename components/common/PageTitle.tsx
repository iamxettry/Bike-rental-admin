import React from "react";

const PageTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <>
      <h1 className={` font-semibold rounded-md  text-2xl ${className}`}>
        {title}
      </h1>
    </>
  );
};

export default PageTitle;
