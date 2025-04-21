import { initCloudStorage } from '@telegram-apps/sdk';



export default function (){
    const cloudStorage = initCloudStorage();
    let cachePrefix = 'ENDAPP_'


    let getNewKey = (key:string|number)=>`${cachePrefix}${key}`;

    let set = (key:string|number, val:any)=>{
        return new Promise((resolve, reject)=>{
            cloudStorage.set(getNewKey(key), val)
                .then(resolve)
                .catch(reject);
        })
    } 

    let get = (key:string|number)=>{
        return new Promise((resolve, reject)=>{
            cloudStorage.get(getNewKey(key))
                .then(resolve)
                .catch(reject);
        })
    } 

    let remove = (key:string|number)=>{
        return new Promise((res, rej)=>{
            cloudStorage.delete(getNewKey(key))
                .then(res)
                .catch(rej);
        })
    } 
    return { set, get,  remove };
}




