import Table from "./Table";
import NavBar from "./NavBar";
import AttendanceDetails from "./AttendanceDetails";
import { useParams} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
function AttendancePage() {
    const params=useParams();
    let reqDate;
    const [tname,setTname]=useState('');
    useEffect(()=>{
      const getTname=async ()=>{
        const res=await fetch(`http://localhost:8000/tname/${params.tid}`);
        const data=await res.json();
        setTname(data[0].name);
      }
      getTname();
    },[])
    if(params.date=="today")
    {
      Date.prototype.yyyymmdd = function() {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();
      
        return [this.getFullYear(),
                (mm>9 ? '' : '0') +mm,
                (dd>9 ? '' : '0') +dd
               ].join('-');
      };
      reqDate=new Date();
      reqDate=reqDate.yyyymmdd();
      console.log(reqDate);
    }
    else{
      reqDate=params.date;
    }
  return (
      <div>
        <AttendanceDetails date={reqDate} tname={tname} tid={params.tid}/>
        <br />
        <Table tid={params.tid} date={reqDate}/>
      </div>
      
  );
}

export default AttendancePage;
