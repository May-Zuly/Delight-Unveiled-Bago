import ContactUsSection from "../components/ContactUs/ContactUsSection";
import { useEffect } from "react";
export default function ContactUsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <ContactUsSection />
    </>
  );
}
