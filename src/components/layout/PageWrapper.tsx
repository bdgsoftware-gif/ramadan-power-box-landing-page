import { ReactNode } from "react";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full overflow-x-hidden">{children}</main>;
}
