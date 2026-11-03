import { Navbar } from "@/components/layout/Navbar";
import { ContactPage } from "@/features/contact/ContactPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Have a project, an opportunity, or an idea? Get in touch with Eric Man.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <Navbar page="contact" />
      <ContactPage />
    </>
  );
}
