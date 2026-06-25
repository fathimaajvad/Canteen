interface Props {
  title: string;
}

export default function SectionTitle({
  title,
}: Props) {
  return (
    <h2 className="text-lg font-bold px-4 mb-3">
      {title}
    </h2>
  );
}