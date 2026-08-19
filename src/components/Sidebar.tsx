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

function Sidebar({
  title,
  menuItems,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] =
  useState(() =>
    window.matchMedia(
      "(max-width: 820px)",
    ).matches,
  )

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

      {!isCollapsed && (
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={
                    item.path === "/teacher"
                  }
                  className={({
                    isActive,
                  }) =>
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
      )}
    </aside>
  )
}

export default Sidebar