import "@/global.css";

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en:US">
      <body>
        {children}
      </body>
    </html>
  )
}