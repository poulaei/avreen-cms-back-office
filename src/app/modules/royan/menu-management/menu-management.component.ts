import {Component, OnInit} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {MenuManagementService} from "./menu-management.service";
import {ToastrService} from "ngx-toastr";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AddNewMenuComponent} from "./add-new-menu/add-new-menu.component";
import {AddSubMenuComponent} from "./add-sub-menu/add-sub-menu.component";
import {ConfirmModalComponent} from "../shared/shared-components/confirm-modal/confirm-modal.component";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
    id: string;
    parentId: string;
    title: string;
    children?: FoodNode[];
}

/** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
    id: string;
}

@Component({
    selector: 'app-menu-management',
    templateUrl: './menu-management.component.html',
    styleUrls: ['./menu-management.component.scss']
})
export class MenuManagementComponent implements OnInit {

    constructor(public menuService: MenuManagementService,
                public modalService: NgbModal,
                public toasterService: ToastrService) {

    }

    private _transformer = (node: FoodNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.title,
            level: level,
            id: node.id
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
        node => node.children,
    );

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    ngOnInit(): void {
        this.getMenuTree();
    }

    hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

    addSubMenu(node: FoodNode): void {
        const modalRef: NgbModalRef = this.modalService.open(AddSubMenuComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.componentInstance.parentId = node.id;
        modalRef.result.then((isCreate: boolean) => {
            if (isCreate) {
                this.toasterService.success('زیرمنو جدید با موفقیت اضافه شد');
                this.getMenuTree();
            }
        }, (): void => {

        });
    }

    editMenu(node: FoodNode): void {
        console.log('EDIT', node);
    }

    deleteMenu(node: FoodNode): void {
        const modalRef: NgbModalRef = this.modalService.open(ConfirmModalComponent, {
            centered: true
        });
        modalRef.componentInstance.confirmTitle = 'حذف منو';
        // @ts-ignore
        modalRef.componentInstance.confirmMessage = 'آیا از حذف منو ' + node.name + ' مطمئن هستید؟';
        modalRef.result.then((isDeleted: boolean) => {
            if (isDeleted) {
                this.menuService.deleteMenu(node.id).subscribe({
                    next: (response: any): void => {
                        this.toasterService.success('منو مورد نظر با موفقیت حذف شد');
                        this.getMenuTree();
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

    getMenuTree(): void {
        this.menuService.getMenuTree().subscribe({
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

    addBaseMenu(): void {
        const modalRef: NgbModalRef = this.modalService.open(AddNewMenuComponent, {
            centered: true,
            size: 'xl'
        });
        modalRef.result.then((isCreate: boolean) => {
            if (isCreate) {
                this.toasterService.success('منو جدید با موفقیت اضافه شد');
                this.getMenuTree();
            }
        }, (): void => {

        });
    }
}
