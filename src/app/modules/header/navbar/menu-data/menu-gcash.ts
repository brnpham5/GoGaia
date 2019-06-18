import { FullMenu } from "./full-menu";
import { MenuContentData } from "./menuContentData";

export class MenuGcashData extends FullMenu {

    constructor(){
        super("gcash");
        //Col1
        this.setCol1Header("Purchase")
        //Purchase Online
        this.addCol1(
            "Purchase Online",
            "/images/angular_header/navbar-icons/currency/icon_gaiacash.png",
            "/payments/"
        );

        //Angel Subscription
        this.addFullCol1(
            "Angel Subscription",
            "/images/angular_header/navbar-icons/other/icon_angel_subscription.png",
            "https://payments-api-ssl.gaiaonline.com/payments/braintree/?_gaia_t_=8688",
            "medium",
            true
        )

        //Paygarden
        this.addCol1(
            "Paygarden",
            "/images/angular_header/navbar-icons/currency/icon_gaiacash.png",
            "/payments/paygarden/"
        );

        //Col2
        this.setCol2Header("Earn GCash");
        //Earn Gaia Cash
        this.addCol2(
            "Offers",
            "/images/angular_header/navbar-icons/currency/icon_gaiacash.png",
            "/offers/gcash/"
        );

        //Earn MORE! Gaia Cash
        this.addCol2(
            "Revenue Universe",
            "/images/angular_header/navbar-icons/currency/icon_gaiacash.png",
            "/offers/gcash2/"
        );

        //Earn GCash from Surveys
        /*
        this.addCol2(
            "Earn GCash from Surveys",
            "/images/angular_header/navbar-icons/currency/icon_gaiacash.png",
            "//publishers.revenueuniverse.com/wall/223/surveys?uid=",
        );
        */

    }
}