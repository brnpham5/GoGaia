import { FullMenu } from "./full-menu";
import { MenuContentData } from "./menuContentData";

export class MenuWorldData extends FullMenu {

    constructor(){
        super("world")

        //Col1
        this.setCol1Header("Virtual Spaces");

        //World Directory
        this.addCol1(
            "World Directory",
            "/images/angular_header/navbar-icons/world/icon_gaia_avatar.png",
            "/world"
        )
        //Towns 2
        this.addCol1(
            "Towns 2",
            "/images/angular_header/navbar-icons/world/icon_towns_2.png",
            "http://www.gaiaonline.com/launch/towns2"
        );

        //Towns
        this.addCol1(
            "Towns",
            "/images/angular_header/navbar-icons/world/icon_towns.png",
            "http://www.gaiaonline.com/launch/towns"
        );

        //Rally
        this.addCol1(
            "Rally",
            "/images/angular_header/navbar-icons/world/icon_rally.png",
            "http://www.gaiaonline.com/launch/rally"
        );

        //Virtual Hollywood
        this.addCol1(
            "Virtual Hollywood",
            "/images/angular_header/navbar-icons/world/icon_virtual_hollywood.png",
            "http://www.gaiaonline.com/launch/hollywood"
        )

        //Col2
        this.setCol2Header("Fun Stuff");
        //Manga
        this.addCol2(
            "Manga",
            "/images/angular_header/navbar-icons/world/icon_manga.png",
            "/newsroom"
        )

        //Offline Events
        this.addCol2(
            "Offline Events",
            "/images/angular_header/navbar-icons/world/icon_offline_events.png",
            "/conventions"
        )
        
        //World Map
        this.addCol2(
            "World Map",
            "/images/angular_header/navbar-icons/world/icon_world_map.png",
            "/worldmap"
        )
    }
}