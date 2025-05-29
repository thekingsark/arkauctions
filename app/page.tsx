import { redirect } from "next/navigation"

export default function RootPage() {
  // Hardcode the default language to avoid import issues
  const defaultLanguage = "en"

  // Redirect to default language
  redirect(`/${defaultLanguage}`)
}
