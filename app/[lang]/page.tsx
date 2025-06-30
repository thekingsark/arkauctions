type PageProps = {
  params: { lang: string }
}

export default function Page({ params }: PageProps) {
  return <div>Lang: {params.lang}</div>
}
