export default function ErrorMessage({
  status,
  detail,
}: {
  status: string;
  detail: string;
}) {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <p className="text-3xl">
        <span className="text-red-600">{status}</span> | {detail}
      </p>
    </div>
  );
}
