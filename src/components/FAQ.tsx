import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQLeft() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          What is the purpose of the Authkey as a Service platform?
        </AccordionTrigger>
        <AccordionContent>
          The platform provides a secure and convenient way for businesses to
          implement user authentication through WhatsApp one-time passwords
          (OTPs). It also helps businesses verify whether the number exists on
          whatsapp or not
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          How does the platform work for user authentication?
        </AccordionTrigger>
        <AccordionContent>
          Businesses integrate our API into their applications or systems. When
          a user needs to be verified, a one-time password (OTP) is generated
          and sent to the user&#39;s WhatsApp number. The user enters the
          received OTP for authentication.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          Is it secure to use WhatsApp OTP for user authentication?
        </AccordionTrigger>
        <AccordionContent>
          Yes, the platform follows industry-standard security practices.
          WhatsApp communication is end-to-end encrypted, ensuring the
          confidentiality of OTPs during transmission. Additionally, our
          platform employs secure channels and encryption protocols.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function FAQRight() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          How can businesses integrate WhatsApp OTP?
        </AccordionTrigger>
        <AccordionContent>
          We provide comprehensive documentation and API guides to facilitate
          easy integration. Developers can follow the step-by-step instructions
          to incorporate WhatsApp OTP authentication seamlessly in under 2 mins.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          What is the monthly Subscription charges?
        </AccordionTrigger>
        <AccordionContent>
          You pay for what you use. There are no subscription charges
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          Do I need to apply for facebook API?
        </AccordionTrigger>
        <AccordionContent>
          No. Everything is handled by us. We use our own systems to send out
          the OTPs
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
