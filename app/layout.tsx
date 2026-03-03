export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>My Next.js App</title>
        <link rel="stylesheet" href="/globals.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}