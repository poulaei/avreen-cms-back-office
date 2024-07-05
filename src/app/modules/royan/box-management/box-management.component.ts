import {Component} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {BoxManagementService} from "./box-management.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AddSubBoxComponent} from "./add-sub-box/add-sub-box.component";
import {ConfirmModalComponent} from "../shared/shared-components/confirm-modal/confirm-modal.component";
import {AddNewContentBoxComponent} from "./add-new-content-box/add-new-content-box.component";
import {EditContentBoxComponent} from "./edit-content-box/edit-content-box.component";

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
    selector: 'app-box-management',
    templateUrl: './box-management.component.html',
    styleUrls: ['./box-management.component.scss']
})
export class BoxManagementComponent {

    constructor(public boxManagementService: BoxManagementService,
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
        this.getBoxTree();
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    addSubBox(node: FoodNode): void {
        const modalRef: NgbModalRef = this.modalService.open(AddSubBoxComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.componentInstance.parentId = node.id;
        modalRef.result.then((isCreate: boolean) => {
            if (isCreate) {
                this.toasterService.success('زیرمجموعه جدید با موفقیت اضافه شد');
                this.getBoxTree();
            }
        }, (): void => {

        });
    }

    editBox(node: FoodNode): void {
        const modalRef: NgbModalRef = this.modalService.open(EditContentBoxComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.componentInstance.contentBoxId = node.id;
        modalRef.result.then((isCreate: boolean) => {
            if (isCreate) {
                this.toasterService.success('باکس با موفقیت ویرایش شد');
                this.getBoxTree();
            }
        }, (): void => {

        });
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
        this.boxManagementService.getContentBoxTree().subscribe({
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

    addNewBox(): void {
        const modalRef: NgbModalRef = this.modalService.open(AddNewContentBoxComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.result.then((isCreate: boolean) => {
            if (isCreate) {
                this.toasterService.success('باکس جدید با موفقیت اضافه شد');
                this.getBoxTree();
            }
        }, (): void => {

        });
    }
}
