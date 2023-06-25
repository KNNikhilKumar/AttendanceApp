
import { useEffect, useState } from "react";
import TableRow from "./TableRow"
import axios from "axios";
import { useParams } from "react-router-dom";
/* const dataTester= async ()=>
  {
    let td=await axios.get('http://localhost:8000/today/2000');
    return td.data;
  }
  let initialData=await dataTester(); */

const Table =  (props) => {
 
  const [studentData,setStudentData]=useState([]);
  const params=useParams();
  useEffect(()=>
  {
    console.log("use effect workig");
    const getStudentDetails=async ()=>{
      const data=await fetchStudentDetails();
      console.log(data);
      setStudentData(data);
    }
    getStudentDetails();
  },[])
  const fetchStudentDetails=async ()=>{
    console.log("INSIDE FETCH");
    const res=await fetch(`http://localhost:8000/attendance/${props.tid}/${props.date}`);
    console.log("data retreived");
    const data=await res.json();
    console.log(data);
    return data;
  }
  return (
    <div>
        <table class="table">
        <thead class="thead-light">
            <tr>
              <th scope="col">STUDENT ID</th>
              <th scope="col">STUDENT NAME</th>
              <th scope="col">STATUS</th>
            </tr>
          </thead>
  <tbody>
    {
      studentData.map((studentDet)=>{
        return <TableRow 
          key={studentDet.sid}
          sid={studentDet.sid}
          tid={studentDet.tid}
          date={studentDet.date}
          status={studentDet.status}
          sname={studentDet.name}
          />;
      })
    }
  </tbody>
</table>

  </div>
    
  )
}

export default Table