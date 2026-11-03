import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { ContactPage } from "@/features/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Eric Man",
  description:
    "Have a project, an opportunity, or an idea? Get in touch with Eric Man.",
};

export default function Contact() {
  return (
    <>
      <Navbar page="contact" />
      <ContactPage />
    </>
  );
}
