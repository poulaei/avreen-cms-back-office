import {Component, OnInit} from '@angular/core';
import {BoxManagementService} from "../box-management.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {ConfirmModalComponent} from "../../shared/shared-components/confirm-modal/confirm-modal.component";
import {ActivatedRoute, Router} from "@angular/router";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
    id: string;
    parentId: string;
    section: string;
    description: string;
    icon: string;
    children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
    id: string;
    icon: string;
}

@Component({
    selector: 'app-content-box-detail',
    templateUrl: './content-box-detail.component.html',
    styleUrls: ['./content-box-detail.component.scss']
})
export class ContentBoxDetailComponent implements OnInit {

    boxId: string = '';

    constructor(public boxManagementService: BoxManagementService,
                public router: Router,
                public route: ActivatedRoute,
                public modalService: NgbModal,
                public toasterService: ToastrService) {

    }

    private _transformer = (node: FoodNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.section + ' / ' + node.description,
            level: level,
            id: node.id,
            icon: node.icon
        };
    };

    treeControl = new FlatTreeControl<ExampleFlatNode>(
        node => node.level,
        node => node.expandable,
    );

    treeFlattener = new MatTreeFlattener(
        this._transformer,
        node => node.level,
        node => node.expandable,
        node => node.children
    );

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.boxId = params['boxId'];
        });
        this.getBoxTree();
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    addSubBox(node: FoodNode): void {
        this.router.navigate(["/royan/addSubContentBox", node.id, this.boxId]);
    }

    editBox(node: FoodNode): void {
        this.router.navigate(["/royan/editContentBox", node.id, this.boxId]);
        // const modalRef: NgbModalRef = this.modalService.open(EditContentBoxComponent, {
        //     centered: true,
        //     size: 'xl'
        // });
        // modalRef.componentInstance.contentBoxId = node.id;
        // modalRef.result.then((isCreate: boolean) => {
        //     if (isCreate) {
        //         this.toasterService.success('باکس با موفقیت ویرایش شد');
        //         this.getBoxTree();
        //     }
        // }, (): void => {
        //
        // });
    }

    deleteBox(node: FoodNode): void {
        const modalRef: NgbModalRef = this.modalService.open(ConfirmModalComponent, {
            centered: true
        });
        modalRef.componentInstance.confirmTitle = 'حذف باکس';
        modalRef.componentInstance.confirmMessage = 'آیا از حذف باکس مطمئن هستید؟';
        modalRef.result.then((isDeleted: boolean) => {
            if (isDeleted) {
                this.boxManagementService.deleteContentBox(node.id).subscribe({
                    next: (response: any): void => {
                        this.toasterService.success('باکس مورد نظر با موفقیت حذف شد');
                        this.getBoxTree();
                    },
                    error: (exception): void => {
                        if (exception && exception.status == 404) {
                            this.toasterService.error('یافت نشد');
                        } else {
                            this.toasterService.error('خطای سیستمی');
                        }
                    }
                });
            }
        }, () => {

        });
    }

    getBoxTree(): void {
        this.boxManagementService.getContentBoxTreeById(this.boxId).subscribe({
            next: (response: any): void => {
                if (!response.error) {
                    this.fillTree(response);
                } else {
                    this.toasterService.error(response.error.message);
                }
            },
            error: (exception: any): void => {
                if (exception.error != null) {
                    this.toasterService.error(exception.error.message);
                }
            }
        });
    }

    fillTree(response: any): void {
        this.dataSource.data = response;
    }

    closeForm(): void {
        this.router.navigate(["/royan/boxManagement"]);
    }
}
