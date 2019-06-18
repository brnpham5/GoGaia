import { FullMenu } from "./full-menu";
import { MenuContentData } from "./menuContentData";

export class MenuMyGaiaData extends FullMenu {

    constructor(){
        super("mygaia");
        //Col1
        this.setCol1Header("Your Items");

        //My Gaia Directory
        this.addCol1(
            "My Gaia",
            "/images/angular_header/navbar-icons/mygaia/icon_mygaia.png",
            "/mygaia/"
        );

        //Avatar
        this.addCol1(
            "Avatar",
            "/images/angular_header/navbar-icons/mygaia/icon_avatar.png",
            "/avatar/"
        );

        //Avatar Builder
        this.addCol1(
            "Avatar Builder",
            "/images/angular_header/navbar-icons/mygaia/icon_avatar.png",
            "/avibuilder/"
        );

        //Inventory
        this.addCol1(
            "Inventory",
            "/images/angular_header/navbar-icons/mygaia/icon_inventory.png",
            "/inventory/"
        );

        //Aquarium
        this.addCol1(
            "Aquarium",
            "/images/angular_header/navbar-icons/mygaia/icon_aquarium.png",
            "/aquarium/"
        );

        //Car
        this.addCol1(
            "Car",
            "/images/angular_header/navbar-icons/mygaia/icon_car.png",
            "/auto"
        );

        //House
        this.addCol1(
            "House",
            "/images/angular_header/navbar-icons/mygaia/icon_house.png",
            "/homes/"
        );

        //Col2
        this.setCol2Header("Other Stuff");
        //Mail
        this.addCol2(
            "Mail",
            "/images/angular_header/navbar-icons/mygaia/icon_mail.png",
            "/profile/privmsg.php"
        )

        //Friends
        this.addCol2(
            "Friends",
            "/images/angular_header/navbar-icons/mygaia/icon_friends.png",
            "/friends/",
        );

        //Profile
        this.addCol2(
            "Profile",
            "/images/angular_header/navbar-icons/mygaia/icon_profile.png",
            "/profiles/"
        )

        //Journals
        this.addCol2(
            "Journals",
            "/images/angular_header/navbar-icons/mygaia/icon_journals.png",
            "/journal/"
        )

        //Achievements
        this.addCol2(
            "Achievements",
            "/images/angular_header/navbar-icons/mygaia/icon_achievements.png",
            "/achievements/"
        ),

        //Account Settings
        this.addCol2(
            "Account Settings",
            "/images/angular_header/navbar-icons/mygaia/icon_account_settings.png",
            "/account/settings/"
        );

        //Gaia Labs
        this.addCol2(
            "Gaia Labs",
            "/images/angular_header/navbar-icons/mygaia/icon_gaia_labs.png",
            "/labs/"
        )

        //Favorites
        this.addCol2(
            "Favorites",
            "/images/angular_header/navbar-icons/mygaia/icon_favorites.png",
            "/collections/show/"
        );

        //Marriage
        this.addCol2(
            "Marriage",
            "/images/angular_header/navbar-icons/mygaia/icon_marriage.png",
            "/marriage/"
        );
    }
}