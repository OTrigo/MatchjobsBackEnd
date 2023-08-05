export interface post {
    id:number;
    createdAt:number;
    name:string;
    description?:string;
    userId:number;
    user:Object;
}