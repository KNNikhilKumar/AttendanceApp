
const AttendanceDetails = (props) => {
  return (
    <div class="card">
  <div class="card-body">
        <p>teacher id: {props.tid}
        <br />
        teacher name : {props.tname}
        <br />
        date : {props.date}</p>
    </div>
    </div>
  )
}

export default AttendanceDetails