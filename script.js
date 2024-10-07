
// light-dark mode
const icon = document.getElementById('display');
icon.addEventListener('click', () => {
    const body = document.body;
    body.classList.toggle('darkmode');
    body.classList.toggle('lightmode');
    if(body.classList.contains('lightmode'))
    {
        icon.innerHTML='<path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" fill="black"/>';
    }
    else{
        icon.innerHTML='<path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" fill="yellow"/>';
    }
});


// input from user
let text=document.getElementById('userno');
let error=document.getElementById('error');
let isRunning = false;
text.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') { 
        if (!isRunning) { 
            getnum();
        }
    }
});
function getnum(){
    error.innerHTML="";
    const num=text.value;
    let errors=[];
    if(num.length<4){ 
        errors.push("Enter a four digit value");
    }
    if (!/^\d+$/.test(num)) {
        errors.push("Only numeric values are allowed");
    }
    else{
        if(allElementsSame(num)){
            errors.push("No repetitions allowed");
        }
    }


    if(errors.length!=0)
    {
        errors.forEach((errorMsg,index) => {
            const ast='*'.repeat(index+1);
            error.innerHTML += ast+errorMsg + "<br>";        
        });
    }
    else{
        simulation(num);
    }
}
function allElementsSame(num) {
    const str = num.toString();
    return str.split('').every(char => char === str[0]);
}
// sim
const res=document.getElementById('res');
async function simulation(ognum){
    isRunning = true; 
    res.innerHTML="";
    let c=0;
    while (ognum !== '6174') 
    {
        let asc = ascending(ognum);
        let desc = descending(ognum);
        res.innerHTML+=`${desc} - ${asc}`;
        await sleep(1000);
        
        
        
        let diff = desc - asc;
        res.innerHTML += ` = ${diff}<br>`;
        await sleep(1000);
    
        await sleep(1000);
        ognum = diff.toString().padStart(4, '0'); 
        res.scrollIntoView({behavior:'smooth'});
        c+=1;
    }
    res.innerHTML += `<br>You've reached Kaprekar's constant (6174) in ${c} steps !!!!`;
    window.scrollTo(0, document.body.scrollHeight);
    isRunning = false; 
}
function ascending(num) {
    let s=num.toString().split('').sort().join('');
    return s.padStart(4,'0');
}
function descending(num) {
    return parseInt(num.split('').sort((a, b) => b - a).join(''), 10);
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let j=document.getElementById('jk');
j.addEventListener('click',()=>{
    res.scrollIntoView({behavior:'smooth'});
});
