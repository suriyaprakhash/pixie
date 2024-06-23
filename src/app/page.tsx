'use client'
import Image from "next/image";
import Container from "./component/container";
import { ThemeContextProvider } from "./component/context/themeContextProvider";

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <ThemeContextProvider>
      <Container />
    </ThemeContextProvider>
  );
}
