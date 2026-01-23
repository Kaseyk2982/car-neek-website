import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="border-b border-stone-900 px-8 py-5">
      <div className="flex flex-col gap-6 lg:flex-row justify-between max-w-7xl mx-auto items-center">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}
