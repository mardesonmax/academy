import Link from "next/link";
import { usePathname } from "next/navigation";

import { FiBookOpen, FiLogOut, FiUser, FiUsers } from "react-icons/fi";
import { ButtonSignOnt } from "./ButtonSignOut";
import { NavbarProfile } from "./NabarProfile";

const links = [
  { icon: FiBookOpen, path: "/courses", name: "Cursos" },
  { icon: FiUser, path: "/docentes", name: "Docentes" },
  { icon: FiUsers, path: "/discentes", name: "Discentes" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="h-screen flex flex-col gap-4 bg-gray-50 p-4 w-[300px]">
      <NavbarProfile />

      <nav>
        <ul>
          {links.map(({ icon: Icon, ...link }) => (
            <li key={link.name}>
              <Link
                className={`${
                  pathname === link.path ? "text-blue-600" : "text-zinc-500"
                } flex items-center gap-1 py-1 text-lg`}
                key={link.name}
                href={link.path}
              >
                <Icon />

                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <ButtonSignOnt />
          </li>
        </ul>
      </nav>
    </div>
  );
}
