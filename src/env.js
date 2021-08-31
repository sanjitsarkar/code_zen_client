let hostUrl=import.meta.env.VITE_HOST_URL;
console.log(hostUrl)
if(hostUrl===undefined)
{
    hostUrl = process.env.VITE_HOST_URL
}
export default hostUrl