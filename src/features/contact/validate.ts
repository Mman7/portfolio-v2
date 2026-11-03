export type ContactField = "name" | "email" | "subject" | "message";
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const contactFields: ContactField[] = [
  "name",
  "email",
  "subject",
  "message",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.email.trim()) errors.email = "Enter your email address.";
  else if (!emailPattern.test(values.email.trim()))
    errors.email = "Enter a valid email, like name@example.com.";
  if (!values.subject.trim()) errors.subject = "Enter a subject.";
  if (values.message.trim().length < 10)
    errors.message = "Write at least 10 characters.";
  return errors;
}
