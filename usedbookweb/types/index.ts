interface follow{
    _id:string;
    avatar:string;
    username:string;
}
interface anthorArr{
    _id:string
}
interface favoposts{
    _id:string,
}
export interface userInfo{
    _id:string;
    avatar:string;
    username:string;
    roles:string;
    bio:string;
    followers:Array<follow>;
    following:Array<follow>;
    pubposts:Array<anthorArr>;
    favoposts:Array<favoposts>;
    messages:Array<anthorArr>;
    comments:Array<anthorArr>;
    meta:{
        createAt:String;
        pdateAt:String;
        lastLogin:String;
    }
}

export interface TpostsCnt{
    res:string;
    tip:string;
    postsCnt:number
}

export interface Tposts{
    res:string,
    tip:string,
    content:{
        _id:string,
        imgCount:number,
        imgURL:string[],
        tags:string[],
        title:string
    }[]
}

export interface TpostItem{
    res:string,
    tip:string,
    content:{
        _id:string,
        title:string,
        content:string,
        status:string,
        tags:string[],
        authorId:{
            _id:string,
            avatar:string,
            username:string
        },
        comments:{
            _id:string,
            userId:string,
            content:string,
            status:string
        }[],
        createdAt:string,
        favo:string[]
    },
    
}