

const NavBar = (props) => {
  return (
    <div className="container-fluid">
        <nav class="navbar navbar-dark bg-dark">
          &ensp;
        <span  class="navbar-brand mb-0 h1">{props.text}</span>
        </nav>
        <br />
        <br />
    </div>
  )
}

export default NavBar