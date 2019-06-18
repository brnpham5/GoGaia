import { Component, OnInit, HostListener, Directive, Input, ElementRef, ViewChild } from '@angular/core'; 

import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/catch';

//Data Types
import { Community } from './services/community';
import { UPE_Bulletin } from './services/bulletin';
import { ClaimData, RewardData } from './services/reward';

//Services
import { CommunityService } from './services/community.service';
import { BulletinService } from './services/bulletin.service';
import { RewardService } from './services/reward.service';

import { environment } from "../../../../environments/environment";

@Component({
    selector: 'gaia-bulletin',
    templateUrl: './bulletin.component.html',
    styleUrls: [ './bulletin.component.css' ],
    providers: [
        BulletinService,
        CommunityService,
        RewardService
    ]
})
export class BulletinComponent implements OnInit {
    apiUrl = environment.apiUrl;
    cdnUrl = environment.cdnUrl;
    aviUrl = environment.aviUrl;

    //Post box view data
    showDialog: boolean = false;
    dialogBody: string;                    //The html of the post body
    dialogTitle: string;
    dialogUsername: string;
    dialogAvatar: string;
    dialogTopicId: string;

    //Post reward data
    dialogSequence: number;             //Sequence number of viewed post
    dialogHasReward: boolean = false;   //Reward indicator
    dialogHasRewardType: number;        //1 for headliner, 2 for announcement
    dialogRewardIndex: number;          //Index to grab the right post
    currencyType: number;

    //Post reward view data
    showReward: boolean = false;    //Show reward boolean
    grantedRewards: RewardData = new RewardData();  //Reward data (item_id, gcash, gold)
    
    //Data involved with posts (announcements or community posts)
    bulletins: UPE_Bulletin[] = new Array<UPE_Bulletin>();
    bulletinCount: number = 0;  //Counter for the number of bulletins displayed
    communityPosts: Community[] = new Array<Community>();
    communityCount: number = 0; // Counter for the number of community posts displayed
    communityFullMode: boolean[] = new Array<boolean>();
    maxCommunity: number = 0;

    //Consolidated data of announcements and community posts
    staggerPosts: any[] = new Array<any>(); //Holds staggered announcement and community posts
    staggerType: number[] = new Array<number>();  //Contains type of post and whether or not to display body
    staggerAmount: number = 4;  //number of community posts to display before the next announcment
    staggerReward_indicator: string[] = new Array<string>();

    //Headliner announcements
    headliners: UPE_Bulletin[] = new Array<UPE_Bulletin>(); //Hold all the headliner announcements
    headlinerReward_indicator: string[] = new Array<string>();

    //Scrolling to bottom variables
    bulletinOffset: number = 0; //offset for the bulletin api
    communityOffset: number = 0; //offset for the community api
    bulletinLimit: number = 3; //limit for bulletins
    communityLimit: number = 12;    //bulletinLimit x staggerAmount

    //Mutex for scrolling to bottom
    mutex_scrollBottom: boolean = false;
    mutex_noMoreData: boolean = false;

    //Quick reward links
    reward_cherry      = this.cdnUrl + "/images/gaia_bulletin/reward_candy_01.png";
    reward_rasberry    = this.cdnUrl + "/images/gaia_bulletin/reward_candy_02.png";
    reward_grape       = this.cdnUrl + "/images/gaia_bulletin/reward_candy_03.png";
    reward_blueberry   = this.cdnUrl + "/images/gaia_bulletin/reward_candy_04.png";
    reward_lime        = this.cdnUrl + "/images/gaia_bulletin/reward_candy_05.png";

    //Error view
    showError: boolean = false;
    errorMsg: string;

    //Modal element
    bottomTouch$: Subscription;

    //Displays a loading mesage/image while content is still loading.
    isLoading: boolean = true;

    //Constructor
    constructor(
        private bulletinService: BulletinService,
        private communityService: CommunityService,
        private rewardService: RewardService
    ){

    }

    /**
     * Grabs a random url to a candy image for the reward indicator
     */
    getRandomRewardCandy(){
        let num = this.randomIntFromInterval(1, 5);
        switch(num){
            case 1: {
                return this.reward_cherry;
            }
            case 2: {
                return this.reward_rasberry;
            }
            case 3: {
                return this.reward_grape;
            }
            case 4: {
                return this.reward_blueberry;
            }
            case 5: {
                return this.reward_lime;
            }
            default: {
                return this.reward_blueberry;
            }
        }

    }

    /**
     * Returns and random int between min and max
     * @param min minimum value to return
     * @param max maximum value to return
     */
    randomIntFromInterval(min, max){
        return Math.floor(Math.random() * max) + min;
    }

    /**
     * Toggles the dialog view
     */
    toggleDialog(){
        this.showDialog = !this.showDialog;
    }

    /**
     * Toggles the reward view
     */
    toggleRewardView(){
        this.showReward = !this.showReward;
    }

    toggleErrorView(){
        this.showError = !this.showError;
    }

    /**
     * Turns on the full-mode
     * @param idx index of post in staggerPosts
     */
    showFullMode(idx: number){
        this.communityFullMode[idx] = true;
    }

    /**
     * Turns off the full-mode
     * @param idx index of post in staggerPosts
     */
    hideFullMode(idx: number){
        this.communityFullMode[idx] = false;
    }

     /**
     * Toggles the headliner body view
     * @param idx : index of headliner
     */
    toggleHeadlinerView(idx: number): void {
        //If headliner has reward, then set the data for the post-modal
        if(this.headliners[idx].has_reward){
            this.dialogHasReward = true;
            this.dialogHasRewardType = 1;
            this.dialogRewardIndex = idx;
            this.dialogSequence = this.headliners[idx].sequence;
        } else {
            //else doesn't have a reward, set nil data
            this.dialogHasReward = false;
            this.dialogHasRewardType = -1;
            this.dialogRewardIndex = -1;
            this.dialogSequence = -1;
        }
        this.dialogBody = this.headliners[idx].body;
        this.dialogAvatar = "";
        this.dialogUsername = "";
        this.dialogTitle = "";
        this.toggleDialog();
    }

    /**
     * Toggles the staggerPosts body view
     * @param idx : index of stagger posts
     */
    toggleStaggerView(idx: number): void {
        if(this.staggerType[idx] == 1 && this.staggerPosts[idx].has_reward == 1){
            //there's a possible reward
            this.dialogHasReward = true;
            this.dialogHasRewardType = 2;
            this.dialogRewardIndex = idx;
            this.dialogSequence = this.staggerPosts[idx].sequence;
        } else {
            //there is no reward
            this.dialogHasReward = false;
            this.dialogHasRewardType = -1;
            this.dialogRewardIndex = -1;
            this.dialogSequence = -1;
        }
        //have the dialogBody display the post body
        this.dialogBody = this.staggerPosts[idx].body;
        
        if(this.staggerPosts[idx].title != null){
            this.dialogTitle = this.staggerPosts[idx].title;
            this.dialogAvatar = this.staggerPosts[idx].avatar;
            this.dialogUsername = this.staggerPosts[idx].username;
            this.dialogTopicId = this.staggerPosts[idx].topic_id;
        } else {
            this.dialogTitle = null;
            this.dialogAvatar = null;
            this.dialogUsername = null;
            this.dialogTopicId = null;
        }
        this.toggleDialog();
    }

    /**
     * 
     */
    setMorePosts(): void {
        //Set indexes for each post type
        for(let i = 0; i < 3; i++){
            //if it's a bulletin, add it and set the appropriate data
            if(this.bulletins[this.bulletinCount] != null){
                this.staggerPosts.push(this.bulletins[this.bulletinCount]);
                this.staggerType.push(1);
                this.communityFullMode.push(false);
                //set reward indicator image
                if(this.bulletins[this.bulletinCount].has_reward == 1){
                    this.staggerReward_indicator[this.bulletinCount + this.communityCount] = this.getRandomRewardCandy();
                }
                this.bulletinCount++;
                this.maxCommunity += this.staggerAmount;
            }
            //Add them staggerAmount at a time
            for(let i = 0; i < this.staggerAmount; i++){
                //If there's a community post, add it to the staggered array
                if(this.communityPosts[this.communityCount] != null && this.communityCount < this.maxCommunity){
                    this.staggerPosts.push(this.communityPosts[this.communityCount]);
                    this.staggerType.push(2);
                    this.communityCount++;
                    this.communityFullMode.push(false);
                }
            }
        }
        //if the user scrolled to the bottom, reset the mutex
        this.mutex_scrollBottom = false;
        //if the the user has seen all existing posts, then get more (API call)
        if(this.bulletinCount == this.bulletins.length && this.communityCount == this.communityPosts.length && this.mutex_noMoreData == false){
            this.mutex_scrollBottom = true;
            this.getMorePosts();
        }
    }

    /**
     * API - Try to claim a reward
     */
    claimReward(): void{
        //Get the nonce value
        this.rewardService.getNonce(this.dialogSequence)
        .subscribe(res => {
            let nonce: string = res;
            let claimData = new ClaimData;
            claimData.nonce = nonce;
            claimData.sequence = this.dialogSequence;
            //send the nonce data to the api and try to claim a reward
            this.rewardService.claimReward(claimData).subscribe(
                res => {
                    //If it returns reward data, then toggle the reward view
                    let data = res;
                    if(data.error != null && data.error != ""){
                        this.errorMsg = data.error;
                        this.toggleErrorView();
                    } else {
                        this.grantedRewards = data;
                        this.toggleRewardView();
                        //And unset the reward indicator.
                        if(this.dialogHasRewardType == 1){
                            this.headliners[this.dialogRewardIndex].has_reward = 0;
                        } else if (this.dialogHasRewardType == 2){
                            this.staggerPosts[this.dialogRewardIndex].has_reward = 0;
                        }
                    }
                }
            )
        });
    }

    /**
     * API - get more posts (bulletin and community)
     * Scrollbottom feature
     */
    getMorePosts(): void {
        this.bulletinOffset += this.bulletinLimit;
        this.communityOffset += this.communityLimit;
        Observable.forkJoin(
            this.bulletinService.getOffsetBulletins(this.bulletinOffset, this.bulletinLimit),
            this.communityService.getOffsetCommunityPosts(this.communityOffset, this.communityLimit)
        ).subscribe(res => {
                res[0].forEach(element => {
                    this.bulletins.push(element);
                });
                res[1].forEach(element => {
                    this.communityPosts.push(element);
                });
                this.mutex_scrollBottom = false;
                if(res[0].length < this.bulletinLimit && res[1].length < this.communityLimit ){
                    this.mutex_noMoreData = true;
                }
        });
    }

    ngOnInit(): void {
        Observable.forkJoin(
            this.bulletinService.getOffsetBulletins(0, this.bulletinLimit),
            this.communityService.getOffsetCommunityPosts(0, this.communityLimit),
            this.bulletinService.getHeadlineBulletins(),
            this.rewardService.getCurrencyType()
        ).subscribe(res => {
                this.bulletins = res[0];
                this.communityPosts = res[1];
                this.headliners = res[2];
                this.currencyType = res[3];
                this.headliners.forEach((element, index) => {
                    if(element.has_reward == 1){
                        this.headlinerReward_indicator[index] = this.getRandomRewardCandy();
                    }
                });
                this.setMorePosts();
                this.isLoading = false;
        });

        /*
        this.bottomTouch$ = this.hack.bottomTouch$.subscribe(
            bottomTouch => {
                if (this.mutex_scrollBottom == false) {
                    this.mutex_scrollBottom = true;
                    setTimeout(() => {
                        this.setMorePosts();
                    }, 250);
                }
            }
        )
        */
    }
    
    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.bottomTouch$.unsubscribe();
    }
}