import Link from "next/link";
import { Logo } from "./Logo";

const footerLinks = {
  Discover: [
    { label: "Rankings", href: "/rankings" },
    { label: "Categories", href: "/categories" },
    { label: "Trending", href: "/rankings?filter=trending" },
    { label: "Compare", href: "/compare" },
  ],
  Rankings: [
    { label: "Best AI Study Tools", href: "/rankings/best-ai-study-tools" },
    { label: "Top 10 AI Tools", href: "/rankings/top-10-ai-tools" },
    { label: "Best Educational Platforms", href: "/rankings/best-educational-platforms" },
    { label: "Best Productivity Apps", href: "/rankings/best-productivity-apps" },
    { label: "Best Websites for Students", href: "/rankings/best-websites-for-students" },
  ],
  Company: [
    { label: "About Rankova", href: "/about" },
    { label: "Ranking Methodology", href: "/methodology" },
    { label: "Editorial Policy", href: "/editorial" },
    { label: "Contact", href: "/contact" },
    { label: "Submit a Product", href: "/submit" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
              Discover. Compare. Rank.
              <br />
              The global platform for finding the best products, tools, and technologies.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 md:flex-row">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Rankova. All rights reserved.
          </p>
          <p className="text-sm text-neutral-500">
            Rankings are editorial opinions informed by research. Not financial or purchasing advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
