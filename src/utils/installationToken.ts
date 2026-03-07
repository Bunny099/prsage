
// @ts-ignore
export const getInstallationToken = async(jwt,id)=>{
    const response = await fetch(`https://api.github.com/app/installations/${id}/access_tokens`,{
        method:"POST",
        headers:{
            "Accept": "application/vnd.github+json",
            "Authorization": `Bearer ${jwt}`,
            "X-GitHub-Api-Version": '2022-11-28'
        }
    })
    if(!response.ok){
        throw new Error("Cant authorized!")
    }
   const data= await response.json();
   return data;
}