import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoyanComponent} from "./royan.component";
import {UserManagementComponent} from "./user-management/user-management.component";
import {MenuManagementComponent} from "./menu-management/menu-management.component";
import {SystemRoleComponent} from "./system-role/system-role.component";
import {BoxComponent} from "./box/box.component";
import {BoxItemsComponent} from "./box-items/box-items.component";
import {BlogComponent} from "./cms/blog/blog.component";
import {BlogCategoryComponent} from "./cms/blog-category/blog-category.component";
import {PageViewComponent} from "./cms/page-view/page-view.component";
import {BoxManagementComponent} from "./box-management/box-management.component";
import {ContentBoxDetailComponent} from "./box-management/content-box-detail/content-box-detail.component";
import {AddNewBlogComponent} from "./cms/blog/add-new-blog/add-new-blog.component";
import {EditBlogComponent} from "./cms/blog/edit-blog/edit-blog.component";
import {AddNewContentBoxComponent} from "./box-management/add-new-content-box/add-new-content-box.component";
import {AddSubBoxComponent} from "./box-management/add-sub-box/add-sub-box.component";
import {EditContentBoxComponent} from "./box-management/edit-content-box/edit-content-box.component";
import {BlogTagsComponent} from "./cms/blog-tags/blog-tags.component";

const routes: Routes = [
    {
        path: '',
        component: RoyanComponent,
        children: [
            {
                path: 'box',
                component: BoxComponent
            },
            {
                path: 'boxItems',
                component: BoxItemsComponent
            },
            {
                path: 'users',
                component: UserManagementComponent
            },
            {
                path: 'roles',
                component: SystemRoleComponent
            },
            {
                path: 'menu',
                component: MenuManagementComponent
            },
            {
                path: 'blog',
                component: BlogComponent
            },
            {
                path: 'blogCategory',
                component: BlogCategoryComponent
            },
            {
                path: 'pageView',
                component: PageViewComponent
            },
            {
                path: 'boxManagement',
                component: BoxManagementComponent
            },
            {
                path: 'boxDetail/:boxId',
                component: ContentBoxDetailComponent
            },
            {
                path: 'addNewBlog',
                component: AddNewBlogComponent
            },
            {
                path: 'editBlog/:blogPostId',
                component: EditBlogComponent
            },
            {
                path: 'addNewContentBox',
                component: AddNewContentBoxComponent
            },
            {
                path: 'addSubContentBox/:parentBoxId/:rootContentBoxId',
                component: AddSubBoxComponent
            },
            {
                path: 'editContentBox/:contentBoxId/:rootContentBoxId',
                component: EditContentBoxComponent
            },
            {
                path: 'tags',
                component: BlogTagsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoyanRoutingModule {
}
