import { FullMenu } from "./full-menu";
import { MenuContentData } from "./menuContentData";

export class MenuForumsData extends FullMenu {

    constructor(){
        super("forums");
        //Col1
        this.setCol1Header("Forums");
        //Forum Directory
        this.addCol1(
            "Forum Directory",
            "/images/angular_header/navbar-icons/forums/icon_chat.png",
            "/forum"
        );

        //Forum 2 Beta
        this.addCol1(
            "Forum 2 Beta",
            "/images/angular_header/navbar-icons/forums/icon_chat.png",
            "/forumv2"
        );

        //Subscribed Threads
        this.addCol1(
            "Subscribed Threads",
            "/images/angular_header/navbar-icons/forums/icon_chat.png",
            "/forum/subscription"
        );

        //My Topics
        this.addCol1(
            "My Topics",
            "/images/angular_header/navbar-icons/forums/icon_chat.png",
            "/forum/mytopics"
        );

        //My Posts
        this.addCol1(
            "My Posts",
            "/images/angular_header/navbar-icons/forums/icon_chat.png",
            "/forum/myposts"
        );

        //Col2
        this.setCol2Header("Community");
        //Guilds
        this.addCol2(
            "Guilds",
            "/images/angular_header/navbar-icons/forums/icon_guilds.png",
            "/guilds"
        );

        //Art Arenas
        this.addCol2(
            "Art Arenas",
            "/images/angular_header/navbar-icons/forums/icon_art_arenas.png",
            "/arena"
        );

        //Clans
        this.addCol2(
            "Clans",
            "/images/angular_header/navbar-icons/forums/icon_clans.png",
            "/clans"  
        );

        //Search
        this.addCol2(
            "Search",
            "/images/angular_header/navbar-icons/forums/icon_search.png",
            "/gsearch"
        );

    }
}