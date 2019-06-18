export class NotificationData {
    account_not: AccountNot;
    announcements: Announcements;
    mygaia_not: MyGaiaNot;
    mygaia_req: MyGaiaReq;
    guild_clan_not: GuildClanNot;
    notices: Notices;
    priv_msg: PrivMsg;
    achievements: Achievements;
}

export class AccountNot {
    account_email_error: boolean = false;
    account_unverified: boolean = false;
    activate_email: boolean = false;
    activation_email_sent: boolean = false;
    count: number = 0;
    notify_account: boolean = false;
    web_mail_url: string = "";
}

export class Announcements {
    announcement_count: number = 0;
    announcement_link: string = "";
    devnews_count: number = 0;
    devnews_link: string = "";
    storyalerts_count: boolean = false;
    storyalerts_link: string = "";
}

export class MyGaiaNot{
    count: number = 0;
}

export class GuildClanNot{
    clan_count: number = 0;
    clan_msglist: object = null;
    guild_count: number = 0;
    guild_msglist: object = null;
}

export class MyGaiaReq {
    count: number = 0;
}

export class Notices {
    count: number = 0;
    notice_url: string = "";
}

export class PrivMsg{
    count: number = 0;
    link: string = "";
}

export class Achievements {
    has_achievements: boolean = false;
    completed: object = null;
    points: number = 0;
    preference: boolean = false;
    count: number = 0;
}