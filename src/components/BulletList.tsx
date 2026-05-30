export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 text-white/70 before:mt-2.5 before:h-1 before:w-1 before:shrink-0 before:rounded-full before:bg-gold before:content-['']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
