import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseTableComponent} from "../../../shared/shared-components/base-table/base-table.component";
import {BaseTableModel} from "../../../shared/shared-components/base-table/base-table.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BaseTableColumnModel} from "../../../shared/shared-components/base-table/base-table-column.model";
import {BaseTableActionModel} from "../../../shared/shared-components/base-table/base-table-action.model";
import {Observable} from "rxjs";
import {BlogPostService} from "../blog-post.service";

@Component({
    selector: 'app-blog-lookup',
    templateUrl: './blog-lookup.component.html',
    styleUrls: ['./blog-lookup.component.scss']
})
export class BlogLookupComponent implements OnInit {

    @ViewChild("blogPostTable") baseTableComponent: BaseTableComponent;
    blogPostTableModel: BaseTableModel = new BaseTableModel();


    constructor(public blogPostService: BlogPostService,
                public modal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.initializeBlogPostTable();
    }

    initializeBlogPostTable(): void {
        let tableColumns: BaseTableColumnModel[];
        tableColumns = [
            {
                columnDefinitionName: 'blogName',
                columnName_Fa: 'نام دسته بندی',
                dataKey: 'blogName'
            },
            {
                columnDefinitionName: 'title',
                columnName_Fa: 'عنوان پست',
                dataKey: 'title'
            },
            {
                columnDefinitionName: 'creationTime',
                columnName_Fa: 'زمان ایجاد',
                type: 'date',
                dataKey: 'creationTime'
            },
            {
                columnDefinitionName: 'status',
                columnName_Fa: 'وضعیت',
                dataKey: 'status'
            }
        ]
        let gridActions: BaseTableActionModel[];
        gridActions = []
        this.blogPostTableModel.hasGridAction = false;
        this.blogPostTableModel.selectable = true;
        this.blogPostTableModel.autoSearch = true;
        this.blogPostTableModel.tableColumns = tableColumns;
        this.blogPostTableModel.gridActions = gridActions;
    }

    doSearch = (): Observable<any> => {
        return this.blogPostService.getAllBlogPosts();
    }
}
