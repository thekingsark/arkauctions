interface PageProps {
  params: { lang: string };
}

export default function Page({ params }: PageProps) {
  // Use params.lang as needed
  return <div>Language: {params.lang}</div>;
}
