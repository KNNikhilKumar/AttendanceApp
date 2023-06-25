
const Teacher = (props) => {
  return (
    <li class="list-group-item">
        <p>
            teacher name: 
            {props.tname}
            <br />
            teacher id:
            {props.tid}
            <br />
            email:
            {props.temail}
            <br /><br />
            <a class="btn btn-primary" href={`http://localhost:3000/date/${props.tid}`} role="button">Take Attendance</a>
        </p>
    </li>
  )
}

export default Teacher