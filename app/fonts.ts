import localFont from "next/font/local";

export const flama = localFont({
  variable: "--font-flama",
  src: [
    {
      path: "../public/fonts/Flama-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Flama-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Flama-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
});