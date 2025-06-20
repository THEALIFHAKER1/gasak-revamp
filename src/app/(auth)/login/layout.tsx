export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="tablet:grid laptop:max-w-none laptop:grid-cols-2 laptop:px-0 relative h-dvh flex-col items-center justify-center">
      {children}
    </div>
  );
}
