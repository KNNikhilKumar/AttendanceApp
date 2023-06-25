import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
const Dates = () => {
 const params=useParams();
 const [dates,setDates]=useState([]);
 useEffect(()=>{
    const getDatesByTeacher=async ()=>{
        const dateData=await fetchDatesByTeacher();
        setDates(dateData);
      }
    getDatesByTeacher();
 },[]);
 const fetchDatesByTeacher=async ()=>{
    const res=await fetch(`http://localhost:8000/dates/${params.tid}`);
    const dates=await res.json();
    return dates;
 }
  return (
    <div class="card">
  <div class="card-body">
    <h5 class="card-title">select date from below</h5><br />
    {dates.map((date)=>{
            return <a href={`http://localhost:3000/attendance/${params.tid}/${date.date}`} class="btn btn-outline-success" role="button" aria-pressed="true">{date.date}</a>;
        })}
    &emsp;
    <a href={`http://localhost:3000/attendance/${params.tid}/today`} class="btn btn-outline-success" role="button" aria-pressed="true">today</a>
  </div>
</div>
  )
}

export default Dates