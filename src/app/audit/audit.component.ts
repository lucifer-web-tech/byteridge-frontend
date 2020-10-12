import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    currentPage: number;
    logs: any[] = [];
    totalItems: number;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    getLogs(pagenum) {
        this.userService.getAudit(pagenum).subscribe((data: any) => {
            if (data[0].count.length > 0) {
                this.logs = data[0].users;
                this.totalItems = data[0].count[0].count;
            }
            this.currentPage = 1;
        });
    }

    
    ngOnInit() {
        this.currentPage = 1;
        this.totalItems = 0;
        this.getLogs(1);
    }
    ngOnDestroy() {}
}