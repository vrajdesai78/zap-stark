
async function walletHistory(address: string) {
    const url = `https://voyager.online/api/txns?to${address}=&ps=10&p=1&type=null`
    const response = await fetch(url);
    const data = await response.json();
    return data;
}



