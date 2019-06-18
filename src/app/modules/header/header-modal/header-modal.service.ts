import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

//Manages communications between components and the dialog manager
@Injectable()
export class HeaderModalService {
    // Observable Sources
    private colorPickerStatus = new Subject<boolean>();
    private dailyChanceStatus = new Subject<boolean>();
    private nameDropDownStatus = new Subject<boolean>();
    private notificationStatus = new Subject<boolean>();
    
    // Observable streams
    colorPickerStatus$ = this.colorPickerStatus.asObservable();
    dailyChanceStatus$ = this.dailyChanceStatus.asObservable();
    nameDropDownStatus$ = this.nameDropDownStatus.asObservable();
    notificationStatus$ = this.notificationStatus.asObservable();

    public updateNotificationStatus(data: boolean){
        this.notificationStatus.next(data);
    }

    public updateNameDropDownStatus(data: boolean){
        this.nameDropDownStatus.next(data);
    }

    public updateDailyChanceStatus(data: boolean){
        this.dailyChanceStatus.next(data);
    }

    public updateColorPickerStatus(data: boolean){
        this.colorPickerStatus.next(data);
    }

}