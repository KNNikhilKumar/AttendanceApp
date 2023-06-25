import AttendanceStatus from "./AttendanceStatus"

const TableRow = (props) => {
  console.log("props...",props);
  return (
    <tr>
      <th scope="row">{props.sid}</th>
      <td>{props.sname}</td>
      <td><AttendanceStatus 
              key={props.sid} 
              name={props.sid}  
              status={props.status}
              date={props.date}
              tid={props.tid}
          />
      </td>
    </tr>
  )
}

export default TableRow