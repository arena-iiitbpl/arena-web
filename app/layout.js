import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "A.R.E.N.A – IIIT Bhopal | Association for Recreation, Esports, and Athletics",
  description: "Build the Game Beyond the Game. Physical sport and competitive esports belong on equal ground at IIIT Bhopal.",
  keywords: ["A.R.E.N.A", "IIIT Bhopal", "Esports", "Sports", "Athletics", "Recreation", "Gaming Club"],
  authors: [{ name: "A.R.E.N.A IIIT Bhopal" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Syne:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen bg-[#060709] text-slate-100 flex flex-col font-['Space_Grotesk',sans-serif] selection:bg-amber-400 selection:text-black antialiased">
        {children}
      </body>
    </html>
  );
}
