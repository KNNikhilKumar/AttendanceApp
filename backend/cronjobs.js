const cron=require('node-cron');
const query=require('./db_ops.js');
const nodemailer = require("nodemailer");


function dateToString(date)
{
    Date.prototype.yyyymmdd = function() {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();
      
        return [this.getFullYear(),
                (mm>9 ? '' : '0') +mm,
                (dd>9 ? '' : '0') +dd
               ].join('-');
      };
    return date.yyyymmdd();
}

//app password:omoduwscqdwjepsj;
async function sendMail(report,receiver)
{
    console.log("inside send mail function");
    let testAccount=nodemailer.createTestAccount();
    let transporter=await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: 'nikhil.samsung.dummy@gmail.com',
      pass: 'omoduwscqdwjepsj', 
    },
    });

    let info = await transporter.sendMail({
        from: '"report sender" <nikhil.samsung.dummy@gmail.com>', // sender address
        to: `${receiver}`, // list of receivers
        subject: "Weekly attendance report", // Subject line
        text: `${report}`,
      });
    console.log(info," ","message sent");
}

//cron job 

const sendWeeklyUpdate=cron.schedule('00 08 * * SUN',async ()=>
{
    console.log("cron job execution started");
    const teachers=await query.getAllTeachers();
    for(let i=0;i<teachers.length;i++){
        const date=new Date();
        const teacher=teachers[i];
        let finalReport="weekly report \n";
        for(let j=1;j<=7;j++){

            date.setDate(date.getDate()-1);
            const dts=dateToString(date);
            const atreport=await query.getAttendanceReport(dts,teacher.tid);

            //console.log("atreport",atreport);

            let present=0;
            let absent=0;

            if(atreport.length>0&&atreport[0].status) present+=parseInt(atreport[0].count);
            if(atreport.length>1&&atreport[1].status) present+=parseInt(atreport[1].count);
            if(atreport.length>0&&!atreport[0].status) absent+=parseInt(atreport[0].count);
            if(atreport.length>1&&!atreport[1].status) absent+=parseInt(atreport[1].count);

            //console.log(present,"*****",absent);

            finalReport+=dts;
            finalReport+='present: '+present;
            finalReport+='absent: '+absent;
            finalReport+='\n';
        }
        //console.log(finalReport);
        await sendMail(finalReport,teacher.email);
    }
});

module.exports={
    sendWeeklyUpdate,
}