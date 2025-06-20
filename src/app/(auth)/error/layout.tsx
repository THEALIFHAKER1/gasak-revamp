export default function ErrorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background relative flex h-dvh items-center justify-center">
      <div className="laptop:p-8 flex w-full items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
}
