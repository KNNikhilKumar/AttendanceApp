import React, { useEffect, useState } from 'react'
import Teacher from './Teacher';
const Home = () => {
 const [teacherList,setTeacherList]=useState([]);

 useEffect(()=>{
    const getTeachers=async ()=>{
        const teacherDetails=await fetchTeacherDetails();
        setTeacherList(teacherDetails);
    }

    getTeachers();
 },);

const fetchTeacherDetails=async ()=>{
    const res=await fetch('http://localhost:8000');
    const data=await res.json();
    console.log(data);
    return data;
};

  return (
    <div class="row align-items-start">
    <div class="col">
     
    </div>
    <div class="col">
    <div class="card" style={{width: '18rem'}}>
        <ul class="list-group list-group-flush">
            {teacherList.map((teacher)=>{
                return <Teacher 
                            tname={teacher.name} 
                            tid={teacher.tid} 
                            temail={teacher.email}
                        />;
            })}
           
        </ul>
    </div>
    </div>
    <div class="col">
      
    </div>
  </div>
  )
}

export default Home