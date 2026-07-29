type HeaderProps = {
  title: string
  teacherName: string
}

function Header({
  title,
  teacherName,
}: HeaderProps) {
  return (
    <header>
      <h1>{title}</h1>
      <p>Hoş geldiniz, {teacherName}</p>
    </header>
  )
}

export default Header