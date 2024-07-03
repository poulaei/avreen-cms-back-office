import {Component, OnInit} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {MenuManagementService} from "./menu-management.service";
import {ToastrService} from "ngx-toastr";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
    title: string;
    children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
    {
        title: 'Fruit',
        children: [{title: 'Apple'}, {title: 'Banana'}, {title: 'Fruit loops'}],
    },
    {
        title: 'Vegetables',
        children: [
            {
                title: 'Green',
                children: [{title: 'Broccoli'}, {title: 'Brussels sprouts'}],
            },
            {
                title: 'Orange',
                children: [{title: 'Pumpkins'}, {title: 'Carrots'}],
            },
        ],
    },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'app-menu-management',
    templateUrl: './menu-management.component.html',
    styleUrls: ['./menu-management.component.scss']
})
export class MenuManagementComponent implements OnInit {

    constructor(public menuService: MenuManagementService,
                public toasterService: ToastrService) {

    }

    private _transformer = (node: FoodNode, level: number) => {
        return {
            expandable: !!node.children && node.children.length > 0,
            name: node.title,
            level: level,
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
        console.log('ADD', node);
    }

    editMenu(node: FoodNode): void {
        console.log('EDIT', node);
    }

    deleteMenu(node: FoodNode): void {
        console.log('DELETE', node);
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

    }
}
