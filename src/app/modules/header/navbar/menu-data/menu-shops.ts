import { FullMenu } from "./full-menu";
import { MenuContentData } from "./menuContentData";

export class MenuShopsData extends FullMenu {

    constructor(){
        super("shops");
        //Col1
        this.setCol1Header("Get Items");
        //Shops Directory
        this.addCol1(
            "Shops Directory",
            "/images/angular_header/navbar-icons/shops/icon_shops_directory.png",
            "/market"
        );

        //Cash Shop
        this.addCol1(
            "Cash Shop",
            "/images/angular_header/navbar-icons/shops/icon_cash_shop.png",
            "/gaia/shopping.php?key=hbjdcjkygqwygbqw"
        );

        //Rococo
        this.addCol1(
            "Rococo",
            "/images/angular_header/navbar-icons/shops/icon_rococo.png",
            "/gaia/shopping.php?key=wnrighnjtisainhi"
        );

        //Mecha Neko
        this.addCol1(
            "Mecha Neko",
            "/images/angular_header/navbar-icons/shops/icon_mecha_neko.png",
            "/gaia/shopping.php?key=shopofmechaneko"
        );

        //GenkiMix
        this.addFullCol1(
            "GenkiMix",
            "/images/angular_header/navbar-icons/shops/icon_genkimix.png",
            "//genkimix.com/",
            "medium",
            true
        );

        //Mix10
        this.addFullCol1(
            "Mix10",
            "/images/mix10/Mix10-Logo-32X32.jpg",
            "//www.gaiaonline.com/internal/lnk_t.php?l=9114",
            "medium",
            true
        )

        //Col2
        this.setCol2Header("More Items");
        //Deals & New Items
        this.addCol2(
            "Deals & New Items",
            "/images/angular_header/navbar-icons/shops/icon_deals.png",
            "/deals"
        );

        //Premium Items
        this.addCol2(
            "Premium Items",
            "/images/angular_header/navbar-icons/shops/icon_premium_items.png",
            "/premiumitems/"
        )

        //Marketplace
        this.addCol2(
            "Marketplace",
            "/images/angular_header/navbar-icons/shops/icon_marketplace.png",
            "/marketplace"
        );

        //Flynn's Plunder
        this.addCol2(
            "Flynn's Plunder",
            "/images/angular_header/navbar-icons/shops/icon_marketplace.png",
            "/marketplace/userstore/10640437"
        )

        //GoFusion
        this.addCol2(
            "GoFusion",
            "/images/angular_header/navbar-icons/shops/icon_go_fusion.png",
            "/gofusion"
        )

        //Alchemy
        this.addCol2(
            "Alchemy",
            "/images/angular_header/navbar-icons/shops/icon_alchemy.png",
            "/alchemy"
        )

        //Trade
        this.addCol2(
            "Trade",
            "/images/angular_header/navbar-icons/shops/icon_trade.png",
            "/gaia/bank.php"
        )

    }
}