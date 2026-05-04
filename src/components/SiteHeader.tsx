const navItems = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Laila", href: "/laila" },
  { label: "General Demos", href: "/general-demos" },
  { label: "Customer's Demos", href: "/customer-demos" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  return (
    <header className="border-b border-gray-200 bg-white/80 px-8 py-4 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="/" className="text-lg font-bold tracking-tight text-gray-950">
          Laila Portfolio
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 transition hover:text-gray-950"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}