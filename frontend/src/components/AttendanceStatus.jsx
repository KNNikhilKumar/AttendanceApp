import { useState } from "react";


const AttendanceStatus = (props) => {
  
  const [attStatus,attStatusChange]=useState(props.status);
  const changeAttStatus=async (st,name)=>{
    //console.log(name);
    const detailSplit=name.split('_');
    const postDate=detailSplit[2];
    const postId=parseInt(detailSplit[1]);
    console.log(postDate,postId);
    const updateObj={
      status:st,
      date:postDate,
      tid:props.tid,
    }
    const res=await fetch(`http://localhost:8000/update/${postId}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(updateObj)
    });
    console.log(res);
    if(st=="true")
    {
      attStatusChange(true)
    }
    else {
      attStatusChange(false)
    }

  };
  return (
    <div class="form-check form-switch">
    <input type="radio" name={`atstatus_${props.name}_${props.date}`} id="present" value={true} checked={attStatus} onChange={(e)=>changeAttStatus(e.target.value,e.target.name)}/>
    <label htmlFor="">Present</label>
    &ensp;
    <input type="radio" name={`atstatus_${props.name}_${props.date}`} id="absent" value={false} checked={!attStatus} onChange={(e)=>changeAttStatus(e.target.value,e.target.name)}/>
    <label htmlFor="">Absent</label>
    </div>
  )
}

export default AttendanceStatus