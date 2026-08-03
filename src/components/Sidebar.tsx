import { NavLink } from "react-router-dom"

type MenuItem = {
  label: string
  path: string
}

type SidebarProps = {
  title: string
  menuItems: MenuItem[]
}

function Sidebar({
  title,
  menuItems,
}: SidebarProps) {
  return (
    <aside>
      <h2>{title}</h2>

      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/teacher"}
                className={({ isActive }) =>
                  isActive
                    ? "sidebar-link sidebar-link-active"
                    : "sidebar-link"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar