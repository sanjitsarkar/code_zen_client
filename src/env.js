let hostUrl=import.meta.env.VITE_HOST_URL;
if(hostUrl===undefined)
{
    hostUrl = process.env.VITE_HOST_URL
}
else{
    hostUrl+="/"
}
export default hostUrl