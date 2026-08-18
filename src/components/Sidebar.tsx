import { useState } from "react"
import { NavLink } from "react-router-dom"

type MenuItem = {
  label: string
  path: string
}

type SidebarProps = {
  title: string
  menuItems: MenuItem[]
}

function getMenuIcon(label: string) {
  if (label === "Genel Bakış") {
    return "⌂"
  }

  if (label === "Dersler") {
    return "▤"
  }

  if (label === "Yeni Ders Oluştur") {
    return "+"
  }

  return "•"
}

function Sidebar({
  title,
  menuItems,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] =
    useState(false)

  return (
    <aside
      className={
        isCollapsed
          ? "sidebar sidebar-collapsed"
          : "sidebar"
      }
    >
      <div className="sidebar-top">
        {!isCollapsed && (
          <h2>{title}</h2>
        )}

        <button
          type="button"
          className="sidebar-toggle"
          onClick={() =>
            setIsCollapsed(!isCollapsed)
          }
          aria-label={
            isCollapsed
              ? "Menüyü aç"
              : "Menüyü daralt"
          }
        >
          {isCollapsed ? "›" : "‹"}
        </button>
      </div>

      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={
                  item.path === "/teacher"
                }
                title={
                  isCollapsed
                    ? item.label
                    : undefined
                }
                className={({ isActive }) =>
                  isActive
                    ? "sidebar-link sidebar-link-active"
                    : "sidebar-link"
                }
              >
                <span className="sidebar-icon">
                  {getMenuIcon(item.label)}
                </span>

                {!isCollapsed && (
                  <span>
                    {item.label}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar