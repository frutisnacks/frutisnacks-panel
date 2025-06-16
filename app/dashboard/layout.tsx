import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[100vh] w-[100vw] overflow-hidden flex ">
      <Header />
      {children}
    </div>
  );
}
