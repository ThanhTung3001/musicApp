 
let apiGet =async (url)=>{
   return await fetch(url).then(response=>response.json());
}
export {apiGet}