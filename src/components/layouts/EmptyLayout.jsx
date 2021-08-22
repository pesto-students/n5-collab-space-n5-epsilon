import React from "react";

const EmptyLayout = ({ children }) => {
  return <div className="Home">{children}</div>;
};

export const getLayout = (page) => (<EmptyLayout>{page}</EmptyLayout>
  );
export default EmptyLayout;
