type SidebarProps = {
  title: string
  menuItems: string[]
}

function Sidebar({
  title,
  menuItems,
}: SidebarProps) {
  return (
    <aside>
      <h2>{title}</h2>

      <ul>
        {menuItems.map((item) => (
          <li key={item}>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar