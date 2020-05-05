export const calTime = (date) => {
    let createdTime = Date.parse(date);
    let time = Date.now() - createdTime;
    let hour = time/(1000*60*60);
    if(hour >= 24){
        let day = Math.floor(hour/24);
        if(day > 1)
            return  `${day} days ago`;
        return `${day} day ago`
    }else if(hour >= 1){
        if(hour > 1)
            return  `${Math.floor(hour)} hours ago`;
        return `${Math.floor(hour)} hour ago`
    }
    else{
        let minute = Math.floor(hour*60);
        if(minute > 1)
            return  `${minute} minutes ago`;
        return `just now`
    }
}

export const trimQuery = (query) => {
    return query.slice(3,query.length);
}