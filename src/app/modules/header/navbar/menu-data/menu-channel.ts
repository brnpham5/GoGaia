import { FullMenu } from "./full-menu";
import { MenuContentData } from "./menuContentData";

export class MenuChannelData extends FullMenu {
    constructor(){
        super("channel");

        //Col
        this.setCol1Header("Play with GCash");

        //Lucky Catch
        this.addCol1(
            "Lucky Catch",
            "/images/angular_header/navbar-icons/other/icon_lucky_catch.png",
            "/luckycatch"
        );

        //Spinami
        this.addCol1(
            "Spinami",
            "/images/angular_header/navbar-icons/currency/icon_gaiacash.png",
            "/spinami"
        );

        //Col2 header is set by navbar component (because of platinum/gold switch)
        //Col2
        //Golden Catch
        this.addCol2(
            "Golden Catch",
            "/images/angular_header/navbar-icons/other/icon_golden_catch.png",
            "/goldencatch"
        )
    }
}