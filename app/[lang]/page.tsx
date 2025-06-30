interface PageProps {
  params: { lang: string }
}
export default function Page({ params }: PageProps) {
  return <div>Language: {params.lang}</div>
}
