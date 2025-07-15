interface follow{
    _id:string;
    avatar:string;
    username:string;
}
interface anthorArr{
    _id:string
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
    favoposts:Array<anthorArr>;
    messages:Array<anthorArr>;
    comments:Array<anthorArr>;
    meta:{
        createAt:String;
        pdateAt:String;
        lastLogin:String;
    }
}