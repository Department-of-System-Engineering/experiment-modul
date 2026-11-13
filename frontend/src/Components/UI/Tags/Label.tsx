export default function Label(htmlFor: string, content: string) {
  return (
    <label htmlFor={htmlFor} className="text-[14px] font-medium">
      {content}
    </label>
  );
}
