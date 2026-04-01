import "dotenv/config.js"
import app from "./app.js"

const PORT = Number(process.env.PORT) || 3000;
let dev = process.env.NODE_ENV === "development";
app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`);
    console.log(`Environment: ${dev? "development" :"production"}`)
})