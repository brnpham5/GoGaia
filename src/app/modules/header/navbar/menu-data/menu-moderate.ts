import { FullMenu } from "./full-menu";
import { MenuContentData } from "./menuContentData";

export class MenuModerateData extends FullMenu {

    constructor(){
        super("moderate");

        //Col1
        this.setCol1Header("Useful Linkz");

        //ModDog
        this.addCol1(
            "ModDog",
            "/images/angular_header/navbar-icons/forums/icon_chat.png",
            "/moddog"
        );

        //Dequeued Reports
        this.addCol1(
            "Dequeued Reports",
            "",
            "/moddog/report/area/99"
        );

        //Workthreads and WIP
        this.addCol1(
            "Workthreads and WIP",
            "",
            "/forum/work-threads-and-wip/f.181"
        )

        //Report to Soylent Green
        this.addCol1(
            "Report to Soylent Green",
            "",
            "/gaia/report.php?r=400"
        );

        //Mod Reward
        this.addCol1(
            "Mod Reward",
            "",
            "/moddog/rewardme/index"
        );

        //Admin Panel
        this.addCol1(
            "Admin",
            "/images/angular_header/navbar-icons/forums/icon_chat.png",
            "/admin"
        );

        //Moderator Handbook
        this.addFullCol1(
            "Moderator Handbook",
            "/images/angular_header/navbar-icons/forums/icon_chat.png",
            "//modbook.gaiaonline.com/",
            "medium",
            true
        )
        
        //Col2
        this.setCol2Header("Staff Forums");

        //Staff Forums
        this.addCol2(
            "Staff Forums",
            "/images/angular_header/navbar-icons/forums/icon_chat.png",
            "/forum/misc-forums/c.7"
        );

        //Staff Discussion
        this.addCol2(
            "Staff Discussion",
            "",
            "/forum/staff-discussion/f.44/"
        )

        //The Bug List
        this.addCol2(
            "The Bug List",
            "",
            "/forum/the-bug-list/f.313/"
        )

        //Staff Testing
        this.addCol2(
            "Staff Testing",
            "",
            "/forum/staff-discussion/f.44/"
        )

        //Soylent Green Forum
        this.addCol2(
            "Soylent Green Forum",
            "",
            "/forum/soylent-green-research/f.100/"
        )

        //Mod Q&A Forum
        this.addCol2(
            "Mod Q&A Forum",
            "",
            "/forum/mod-q-a/f.104/"
        );

        //Mod Training Forum
        this.addCol2(
            "Mod Training Forum",
            "",
            "/forum/training-board/f.395/"
        );

        //Global Discussion
        this.addCol2(
            "Global Discussion",
            "",
            "/forum/global-discussion/f.237/"
        );

        //Omnimod Discussion
        this.addCol2(
            "Omnimod Discussion",
            "",
            "/forum/omnimod-discussion/f.24/"
        );

        //FA Discussion
        this.addCol2(
            "FA Discussion",
            "",
            "/forum/forum-assistant-discussion/f.127/"
        )
    }

}