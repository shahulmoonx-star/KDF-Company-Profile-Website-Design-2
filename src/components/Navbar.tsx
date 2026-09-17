import Image from "next/image";

/*
 * The data-nav-* hooks are what LoadingScreen measures on mount to work out
 * where to fly the logo and where the fluid line should come to rest. Keep
 * them on the header and the logo if either is restyled or moved — the loader
 * adapts to whatever it measures, but it does need to find these two.
 */
export default function Navbar() {
  return (
    <header
      data-nav-header
      className="sticky top-0 z-40 h-24 border-b-[3px] border-signal-500 bg-cream-100 shadow-[0_4px_10px_-6px_rgba(0,0,0,0.12)]"
    >
      <div className="flex h-full items-center px-6">
        <Image
          data-nav-logo
          src="/images/logo.png"
          alt="Kuwait Drilling Fluids & Oil Service Company"
          width={320}
          height={118}
          priority
          className="h-14 w-auto"
        />
      </div>
    </header>
  );
}
