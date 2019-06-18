import { MenuContentData } from "./menuContentData";

export class FullMenu {
    name: string;

    col1_header: string;
    col1: MenuContentData[] = new Array<MenuContentData>();

    col2_header: string;
    col2: MenuContentData[] = new Array<MenuContentData>();

    constructor(name: string){
        this.name = name;
    }

    getCol1(): MenuContentData[]{
        return this.col1;
    }

    getCol2(): MenuContentData[]{
        return this.col2;
    }

    addCol1(text: string, img: string, link: string) {
        let temp = new MenuContentData;
        temp.text = text;
        temp.img = img;
        temp.link = link;
        temp.type = 'medium';
        temp.direct_link = false;

        this.col1.push(temp);
    }

    addCol2(text: string, img: string, link: string) {
        let temp = new MenuContentData;
        temp.text = text;
        temp.img = img;
        temp.link = link;
        temp.type = 'medium';
        temp.direct_link = false;

        this.col2.push(temp);
    }

    addCol1Large(text: string, img: string, link: string) {
        let temp = new MenuContentData;
        temp.text = text;
        temp.img = img;
        temp.link = link;
        temp.type = "large";
        temp.direct_link = false;

        this.col1.push(temp);
    }

    addCol2Large(text: string, img: string, link: string) {
        let temp = new MenuContentData;
        temp.text = text;
        temp.img = img;
        temp.link = link;
        temp.type = "large";
        temp.direct_link = false;

        this.col2.push(temp);
    }

    addCol1Type(text: string, img: string, link: string, type: string) {
        let temp = new MenuContentData;
        temp.text = text;
        temp.img = img;
        temp.link = link;
        temp.type = type;
        temp.direct_link = false;

        this.col1.push(temp);
    }

    addCol2Type(text: string, img: string, link: string, type: string) {
        let temp = new MenuContentData;
        temp.text = text;
        temp.img = img;
        temp.link = link;
        temp.type = type;
        temp.direct_link = false;

        this.col2.push(temp);
    }

    addFullCol1(text: string, img: string, link: string, type: string = "medium", direct_link: boolean = false){
        let temp = new MenuContentData;
        temp.text = text;
        temp.img = img;
        temp.link = link;
        temp.type = type;
        temp.direct_link = direct_link;

        this.col1.push(temp);
    }

    addFullCol2(text: string, img: string, link: string, type: string = "medium", direct_link: boolean = false) {
        let temp = new MenuContentData;
        temp.text = text;
        temp.img = img;
        temp.link = link;
        temp.type = type;
        temp.direct_link = direct_link;

        this.col2.push(temp);
    }

    setCol1Header(header: string){
        this.col1_header = header;
    }

    setCol2Header(header: string){
        this.col2_header = header;
    }

}