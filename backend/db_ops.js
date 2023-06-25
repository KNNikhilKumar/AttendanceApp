const Pool=require('pg').Pool;
const pool=new Pool({
    host:'localhost',
    database:'postgres',
    password:'postgres',
    user:'postgres',
    port:5432,
})

const getStudentByTid= async (tid)=>
{
    try{
        const data=await pool.query('select * from student where tid=$1 order by sid',[parseInt(tid)]);
        console.log(data.rowCount);
        return data.rows;
    }
    catch(error){ 
        console.log(error);
        return "error while reading database";
    }
}

const getAttendanceForToday=async (tid)=>
{
    pool.query('BEGIN');
    try
    {
        Date.prototype.yyyymmdd = function() {
            var mm = this.getMonth() + 1; // getMonth() is zero-based
            var dd = this.getDate();
          
            return [this.getFullYear(),
                    (mm>9 ? '' : '0') +mm,
                    (dd>9 ? '' : '0') +dd
                   ].join('-');
          };
          
        const date = new Date();
        const das=date.yyyymmdd();
        console.log(das);
        const markedData=await pool.query('select * from attendance_status where tid=$1 and date=$2',[parseInt(tid),das]);
        let retData;
        if(markedData.rowCount==0)
        {
            console.log("inside if");
            const studentList=await pool.query('select * from student where tid=$1 order by sid',[parseInt(tid)]);
            console.log(studentList.rows);
            //studentlist retreiving correctly
            for(let i=0;i<studentList.rows.length;i++)
            {
                const studentDetails=studentList.rows[i];
                console.log(studentDetails.sid);
                let tsid=studentDetails.sid;
                let tempname=studentDetails.name;
                let insertStatus=await pool.query('insert into attendance(sid,tid,date,name) values($1,$2,$3,$4)',[tsid,parseInt(tid),das,tempname]);
            }
            const attStatusInsertion=await pool.query('insert into attendance_status(tid,date) values($1,$2)',[parseInt(tid),das]);

            retData=await pool.query('select * from attendance where tid=$1 and date=$2 order by sid',[parseInt(tid),das]);
        }
        else
        {
            console.log("inside else");
            console.log(das);
            retData=await pool.query('select * from attendance where tid=$1 and date=$2 order by sid',[parseInt(tid),das]);
            console.log(retData.rows);
        }
        pool.query('COMMIT');
        return retData.rows;
    }
    catch(error)
    {
        console.log(error);
        pool.query('ROLLBACK');
        return "error while reading database";
    }
}

const getAllTeachers=async ()=>
{
    try{
        const data=await pool.query('select * from teacher');
        console.log(data.rowCount);
        return data.rows;
    }
    catch(error){ 
        console.log(error);
        return "error while reading database";
    }
}

//working fine
const updateStudentAttendance=async (date,sid,status)=>
{
    pool.query('BEGIN');
    try{
        console.log(status,date,sid);
        const ups=await pool.query('update attendance set status=$1 where sid=$2 and date=$3',[status,parseInt(sid),date]);
        console.log(ups);
        pool.query('COMMIT');
        return "update success";
    }
    catch(error)
    {
        console.log(error);
        pool.query('ROLLBACK');
        return "database updating failed";
    }
}

const updateAttendanceStatus=async (date,tid,status)=>{
    console.log('inside db_ops');
 try{
    const aus=await pool.query('update attendance_status set marked=$1 where tid=$2 and date=$3',[status,parseInt(tid),date]);
    return "status update successful";
 }
 catch(err)
 {
    console.log(err);
    return "error occured in updating attendance status";
 }
}
//query for cron job tid is passed as an integer and date is passed as a string

const getAttendanceReport=async (date,tid)=>
{
    const result=await pool.query('select status,count(status) from (select * from attendance where tid=$1 and date=$2) as x group by status;',[tid,date]);
    return result.rows;
}

const getAttendanceByDate=async (date,tid)=>{
    let res=await pool.query('select * from attendance where tid=$1 and date=$2 order by sid',[parseInt(tid),date]);
    if(res.rowCount==0)
    {
        res=getAttendanceForToday(tid+"");
    }
    return res.rows;   
}

const getAllDates=async (tid)=>{
    let res=await pool.query('select date from attendance_status where tid=$1',[parseInt(tid)]);
    return res.rows;
}

const getTeacherName=async (tid)=>{
    let res=await pool.query('select * from teacher where tid=$1',[parseInt(tid)]);
    return res.rows
}
module.exports={
    getStudentByTid,
    getAllTeachers,
    getAttendanceForToday,
    updateStudentAttendance,
    updateAttendanceStatus,
    getAttendanceReport,
    getAttendanceByDate,
    getAllDates,
    getTeacherName,
}