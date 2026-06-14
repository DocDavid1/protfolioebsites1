export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 30%, rgba(59,130,246,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md">{children}</div>
    </div>
  );
}
