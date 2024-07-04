import {Component} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {BoxManagementService} from "./box-management.service";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {AddSubBoxComponent} from "./add-sub-box/add-sub-box.component";

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
            name: node.section + ' / ' + node.icon,
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
        this.getMenuTree();
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
                this.getMenuTree();
            }
        }, (): void => {

        });
    }

    editMenu(node: FoodNode): void {
        console.log('EDIT', node);
    }

    deleteMenu(node: FoodNode): void {
        console.log('DELETE', node);
    }

    getMenuTree(): void {
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

    }
}
