// The homepage is fully self-contained (its own header + footer) so it can carry
// a single cohesive dark theme end-to-end. No shared light Navbar/Footer here.
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
