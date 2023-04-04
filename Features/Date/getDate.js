exports.getDate=(date)=>{
    let  today 		= new Date();
    let  dd 		= String(today.getDate()+date).padStart(2, '0');
    let  mm 		= String(today.getMonth() + 1).padStart(2, '0'); 
    let  yyyy 		= today.getFullYear();
    
    return `${yyyy}-${mm}-${dd}`; 
}


exports.expireDate =(date)=>{
    let  today 		= new Date();
    let  dd 		= String(today.getDate()+date).padStart(2, '0');
    let  mm 		= String(today.getMonth() + 1).padStart(2, '0'); 
    let  yyyy 		= today.getFullYear()+1;
    
    return `${yyyy}-${mm}-${dd}`; 
}