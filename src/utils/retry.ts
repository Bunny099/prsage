
interface RetryInput{
    fn: (data:any)=>Promise<{text: string | undefined}>,
    data:any
}
export const retry = async ({fn,data}:RetryInput) => {
  let maxAttempt =4;
  let delay = (ms:number)=>{return new Promise(res=>setTimeout(res,ms))}
  for(let attempt =1;attempt<=maxAttempt;attempt++){
    try{
        let response = await fn(data);
        if(response?.text){
            return response;
        }
    }catch(e){
        //retry!
    }
    if(attempt<=maxAttempt){
        await delay(500)
    }
  }
  throw new Error("AI failed after retries!")
};
