import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LNK AI Video — AI Music Video Generator",
  description: "Upload your song and image. Get one AI music video free every day, up to 5 minutes."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
