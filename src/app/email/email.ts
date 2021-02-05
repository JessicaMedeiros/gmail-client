export class Email{
    id!:number;
    title!:string;
    content!:string;
    idUser!:number;
    isread!:boolean;
    favorite!:boolean;
    date!:Date;

    constructor(content: string, title:string, idUser:number){
        this.content = content;
        this.title = title;
        this.idUser = idUser;
    }

}