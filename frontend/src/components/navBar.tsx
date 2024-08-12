import Link from "next/link";
import { NomicBrand } from "./brand";
import { HomeIcon, ChartBarIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/lib/utils";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", icon: HomeIcon, href: "/", current: true },
  {
    name: "UMAP",
    icon: ChartBarIcon,
    href: "/umap",
    current: true
  }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-navy-950 px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <Link href="/">
          <NomicBrand />
        </Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.href === pathname
                        ? "bg-blue-700 text-white"
                        : "text-navy-200 hover:text-white hover:bg-blue-700",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.href === pathname
                          ? "text-white bg-blue-700"
                          : "text-navy-200 group-hover:text-white",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
