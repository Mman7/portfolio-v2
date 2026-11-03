// Netlify Forms are detected from the static HTML in public/forms.html.
const FORMS_PAGE = "/forms.html";

export async function submitNetlifyForm(
  formName: string,
  fields: Record<string, string>,
) {
  const response = await fetch(FORMS_PAGE, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ "form-name": formName, ...fields }),
  });
  if (!response.ok) throw new Error(String(response.status));
}
