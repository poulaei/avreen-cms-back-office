import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

    @Input() confirmTitle: string;
    @Input() confirmMessage: string;

    constructor(public modal: NgbActiveModal) {

    }

    ngOnInit(): void {

    }

    sendYes() {
        this.modal.close(true);
    }

    sendNo() {
        this.modal.close(false);
    }
}
