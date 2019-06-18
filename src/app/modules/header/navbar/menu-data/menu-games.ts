import { FullMenu } from "./full-menu";
import { MenuContentData } from "./menuContentData";

export class MenuGamesData extends FullMenu {

    constructor(){
        super("games");
        //col1
        this.setCol1Header("Gaia's Games");

        this.addCol1Large(
            "Games Directory",
            "/images/angular_header/navbar-icons/games/icon_checkerboard.png",
            "/games"
        );

        //Lake Kindred
        this.addCol1Large(
            "Lake Kindred",
            "/images/angular_header/navbar-icons/games/icon_lake_kindred.png",
            "/pets"
        );

        //Play zOMG!
        this.addCol1Large(
            "Play zOMG!",
            "/images/angular_header/navbar-icons/games/icon_zOMG.png",
            "http://www.gaiaonline.com/launch/zomg"
        )

        //Empire
        this.addCol1Large(
            "Empire",
            "/images/angular_header/navbar-icons/games/icon_empire.png",
            "/goodgame/?_gaia_t_=8728t"
        );

        //col2
        this.setCol2Header("Mini-Games");

        //Runway
        this.addCol2Large(
            "Runway",
            "/images/angular_header/navbar-icons/games/icon_runway.png",
            "/runway/?_gaia_t_=8889"
        );

        //Dumpster Dive
        this.addCol2Large(
            "Dumpster Dive",
            "/images/angular_header/navbar-icons/games/icon_dumpster_dive.png",
            "/dumpsterdive"
        );

        //Fishing
        this.addCol2(
            "Fishing",
            "/images/angular_header/navbar-icons/games/icon_fishing.png",
            "/fishing"
        )
    }

}