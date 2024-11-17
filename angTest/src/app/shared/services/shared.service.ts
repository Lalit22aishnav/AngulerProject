// shared.service.ts
import { Injectable } from '@angular/core';
import { subscribe } from 'diagnostics_channel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    private state = new BehaviorSubject<{ [key: string]: any }>({
        /* ADD KEY HERE */
        isOpen: false,
        subscribeObj: {}
    });

    data$ = this.state.asObservable();

    setData(newValue: { [key: string]: any }) {
        const currentState = this.state.value;
        this.state.next({ ...currentState, ...newValue });
    }
}
