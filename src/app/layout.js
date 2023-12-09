import "./globals.css";
import NavBar from "@/Components/NavBar";
import Footer from "@/Components/Footer";
import 'rsuite/dist/rsuite.min.css';
import { UseStoreContextProvider } from "@/Context/UseStoreContext";
import { UserAuthContexProvider } from "@/Context/UserAuthContext";
import { Toaster } from "react-hot-toast";
import Authentication from "@/Components/Modal/Authentication";
import RenderAllModal from "@/Components/Modal/RenderAllModal";

export const metadata = {
  title: "WebEase",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://unicons.iconscout.com/release/v4.0.8/css/line.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css"
        />
      </head>
      <body>
        <UseStoreContextProvider>
          <UserAuthContexProvider>
            <Authentication />
            <Toaster  />
            {/* <main className="  md:px-0 container  pb-2 pt-[64px]  md:pt-28   m-auto  text-sm md:text-base"> */}
            <main className="  md:px-0 no-scrollbar bgGround     pb-2 m-auto  text-sm md:text-base">
              {children}
              <RenderAllModal />
            </main>
            {/* <Footer /> */}
          </UserAuthContexProvider>
        </UseStoreContextProvider>
      </body>
    </html>
  );
}
