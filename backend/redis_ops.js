const redis=require('redis');
const client=redis.createClient();

const get=(key)=>{
   return new Promise((resolve,reject)=>{
    client.get(key,(err,reply)=>{
        if(err) reject(err);
        resolve(reply);
    })
   })
}

const exists=async (key)=>{
       return new Promise((resolve,reject)=>{
            client.exists(key,(err,reply)=>{
                if(err)
                {
                    reject(err);
                }
                else if(reply==1)
                {
                    resolve(true);
                }
                else{
                    resolve(false);
                }
            })
       });
}

const set=async (key,value)=>{
    return new Promise((resolve,reject)=>{
        client.set(key,value,(err,reply)=>{
            if(err) reject(err);
            resolve(reply);
        })
    })
}

const deleteKey=(key)=>{
    return new Promise((resolve,reject)=>{
        client.del(key,(err,reply)=>{
            if(err) reject(err);
           resolve(reply);
        })
    })
}

module.exports={
    get,
    exists,
    set,
    deleteKey
}

