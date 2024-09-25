import "@/global.css";

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en:US">
      <body>
        {/* <HeadingBar /> */}
        {children}
      </body>
    </html>
  )
}

function HeadingBar() {
  return (
    <div style={{height:100, backgroundColor: "indigo"}}>
      <a>Home</a>
      <a>Home</a>
      <a>Home</a>
    </div>
  )
}