import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import CustomProviders from "@/StoreConfiguration/CustomProviders";
// import Header_component from "./component/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "News",
  // description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        <script
          src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp,container-queries"></script>

        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
      </Head>
      <html lang="en">
        <body className="bg-[#FFF6E3] dark:bg-[#FFF6E3]">
          <CustomProviders>

            <div className="bg-[#FFF6E3] font-serif">
              {children}
            </div>
          </CustomProviders>

        </body>
      </html>


    </>
  );
}
