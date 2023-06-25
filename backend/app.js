const hapi=require('hapi');
const query=require('./db_ops.js');
const cronjobs=require('./cronjobs.js');
const cors=require('cors');
const redis=require('./redis_ops.js');

const server=hapi.server({
        host:'localhost',
        port:8000,
        routes: {
            cors: true
        },    
    });

const init=async ()=>{
    
    await server.start();
    console.log("log server started");
}

init();


//get requests

server.route({
    method:'GET',
    path:'/{tid}',
    handler:async (req,h)=>
    {
        const data=await query.getStudentByTid(req.params.tid);
        return data;
    }
});

server.route({
    method:'GET',
    path:'/today/{tid}',
    handler:async (req,h)=>
    {
        const data=await query.getAttendanceForToday(req.params.tid);
        return data;
    }
});

server.route({
    method:'GET',
    path:'/',
    handler:async (req,h)=>
    {
        const data=await query.getAllTeachers();
        return data;
    }
});

//post requests
//post body =>status,date
server.route({
    method:'POST',
    path:'/update/{sid}',
    handler:async (req,h)=>
    {
        console.log(req.payload);
        Date.prototype.yyyymmdd = function() {
            var mm = this.getMonth() + 1; // getMonth() is zero-based
            var dd = this.getDate();
          
            return [this.getFullYear(),
                    (mm>9 ? '' : '0') +mm,
                    (dd>9 ? '' : '0') +dd
                   ].join('-');
          };
        const date = new Date();
        let das=date.yyyymmdd();
        if(req.payload.date!=='')
        {
            das=req.payload.date;
        }
        const updateStatus=await query.updateStudentAttendance(das,req.params.sid,req.payload.status);
        redis.deleteKey(req.payload.tid+" "+das);
        console.log(updateStatus);
        return updateStatus;
    }
});

server.route({
    method:'POST',
    path:'/update/status/{tid}',
    handler:async (req,h)=>{
        Date.prototype.yyyymmdd = function() {
            var mm = this.getMonth() + 1; // getMonth() is zero-based
            var dd = this.getDate();
          
            return [this.getFullYear(),
                    (mm>9 ? '' : '0') +mm,
                    (dd>9 ? '' : '0') +dd
                   ].join('-');
          };
        const date = new Date();
        let das=date.yyyymmdd();
        if(req.payload.date!='')
        {
            das=req.payload.date;
        }
        const updateStatus=await query.updateAttendanceStatus(das,req.params.tid,req.payload.status);
        return updateStatus;
    }
});

server.route({
    method:'GET',
    path:'/dates/{tid}',
    handler:async (req,h)=>{
        const dates=await query.getAllDates(req.params.tid);
        return dates;
    }
})

server.route({
    method:'GET',
    path:'/attendance/{tid}/{date}',
    handler:async (req,h)=>{
        const key=req.params.tid+" "+req.params.date;
        const isPresent=await redis.exists(key);
        if(isPresent)
        {
            const cachedData=await redis.get(key);

            console.log("returning from the cache");
            const jsonData=await JSON.parse(cachedData);
            return jsonData;
        }
        console.log("returning from db");
        const att=await query.getAttendanceByDate(req.params.date,req.params.tid);
        await redis.set(key,JSON.stringify(att));
        console.log("att",att);
        return att;
    }
})

server.route({
    method:'GET',
    path:'/tname/{tid}',
    handler:async (req,h)=>{
        const att=await query.getTeacherName(req.params.tid);
        return att;
    }
})