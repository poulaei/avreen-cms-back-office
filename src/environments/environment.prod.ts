export const apiUrl = {
    base: 'http://172.16.23.2/api',
}

export const environment = {
    production: false,
    appVersion: 'v0.0.1',
    USERDATA_KEY: 'authf649fc9a5f55',
    isMockEnabled: true,
    apiUrl: 'api',
    appThemeName: 'Royan',
    appPurchaseUrl: 'https://1.envato.market/EA4JP',
    appHTMLIntegration: 'https://preview.keenthemes.com/metronic8/demo1/documentation/base/helpers/flex-layouts.html',
    appPreviewUrl: 'https://preview.keenthemes.com/metronic8/angular/demo1/',
    appPreviewAngularUrl: 'https://preview.keenthemes.com/metronic8/angular/demo1',
    appPreviewDocsUrl: 'https://preview.keenthemes.com/metronic8/angular/docs',
    appPreviewChangelogUrl: 'https://preview.keenthemes.com/metronic8/angular/docs/changelog',
    //AUTH SERVICES//
    loginUrl: 'http://172.16.23.2/api/api/account/login',
    getConfiguration: 'http://172.16.23.2/api/Abp/ApplicationConfigurationScript',
    getUserByToken: 'http://172.16.23.2/api/api/account/my-profile',
    //BOX ITEMS SERVICES//
    addNewBoxItem: 'http://172.16.23.2/api/api/app/box-item-admin',
    getBoxItems: 'http://172.16.23.2/api/api/app/box-admin/box-items/',
    deleteBoxItem: 'http://172.16.23.2/api/api/app/box-item-admin/',
    uploadMedia: 'http://172.16.23.2/api/api/cms-kit-admin/media/',
    downloadMedia: 'http://172.16.23.2/api/api/cms-kit/media/',
    getBoxItemInfo: 'http://172.16.23.2/api/api/app/box-item-admin/',
    editBoxItem: 'http://172.16.23.2/api/api/app/box-item-admin/',
    //BOX SERVICES//
    deleteBox: 'http://172.16.23.2/api/api/app/box-admin/',
    getAllBoxes: 'http://172.16.23.2/api/api/app/box-admin',
    addNewBox: 'http://172.16.23.2/api/api/app/box-admin',
    getBoxInfo: 'http://172.16.23.2/api/api/app/box-admin/',
    editBox: 'http://172.16.23.2/api/api/app/box-admin/',
    //BLOG CATEGORY SERVICES//
    getAllCategories: 'http://172.16.23.2/api/api/cms-kit-admin/blogs',
    addNewCategory: 'http://172.16.23.2/api/api/cms-kit-admin/blogs',
    deleteCategory: 'http://172.16.23.2/api/api/cms-kit-admin/blogs/',
    getCategory: 'http://172.16.23.2/api/api/cms-kit-admin/blogs/',
    editCategory: 'http://172.16.23.2/api/api/cms-kit-admin/blogs/',
    //BLOG TAG SERVICES//
    getAllTags: 'http://172.16.23.2/api/api/cms-kit-admin/tags',
    addNewTag: 'http://172.16.23.2/api/api/cms-kit-admin/tags',
    deleteTag: 'http://172.16.23.2/api/api/cms-kit-admin/tags/',
    getTag: 'http://172.16.23.2/api/api/cms-kit-admin/tags/',
    editTag: 'http://172.16.23.2/api/api/cms-kit-admin/tags/',
    //BLOG SERVICES//
    getAllBlogPosts: 'http://172.16.23.2/api/api/cms-kit-admin/blogs/blog-posts',
    addNewBlogPost: 'http://172.16.23.2/api/api/cms-kit-admin/blogs/blog-posts/create-and-publish',
    deleteBlogPost: 'http://172.16.23.2/api/api/cms-kit-admin/blogs/blog-posts/',
    editBlogPost: 'http://172.16.23.2/api/api/cms-kit-admin/blogs/blog-posts/',
    getBlogPost: 'http://172.16.23.2/api/api/cms-kit-admin/blogs/blog-posts/',
    getBlogPostTags: 'http://172.16.23.2/api/api/cms-kit-public/tags/',
    submitTag: 'http://172.16.23.2/api/api/cms-kit-admin/entity-tags',
    //PAGES SERVICES//
    getAllPages: 'http://172.16.23.2/api/api/cms-kit-admin/pages',
    addNewPage: 'http://172.16.23.2/api/api/cms-kit-admin/blogs',
    deletePage: 'http://172.16.23.2/api/api/cms-kit-admin/blogs/',
    // addNewBox: '/api/app/box-admin',
    // getBoxInfo: '/api/app/box-admin/',
    // editBox: '/api/app/box-admin/',
    //USER SERVICES//
    getAllUsers: 'http://172.16.23.2/api/api/identity/users',
    //ROLE SERVICES//
    getAllRoles: 'http://172.16.23.2/api/api/identity/roles',
    //MENU SERVICES//
    getAllMenus: 'http://172.16.23.2/api/api/app/menu-item-admin',
    getMenuTree: 'http://172.16.23.2/api/api/cms-kit-public/menu-items/get-tree',
    addNewMenu: 'http://172.16.23.2/api/api/cms-kit-admin/menu-items',
    deleteMenu: 'http://172.16.23.2/api/api/cms-kit-admin/menu-items/',
    getMenuInfo: 'http://172.16.23.2/api/api/cms-kit-admin/menu-items/',
    editMenu: 'http://172.16.23.2/api/api/cms-kit-admin/menu-items/',
    //CONTENT BOX SERVICES//
    getContentBoxRoot: 'http://172.16.23.2/api/api/cms-kit-public/contentBoxes/by-parent',
    getContentBoxTree: 'http://172.16.23.2/api/api/cms-kit-public/contentBoxes/get-tree',
    getContentBoxTreeById: 'http://172.16.23.2/api/api/cms-kit-public/contentBoxes/get-tree-by-id',
    addNewContentBox: 'http://172.16.23.2/api/api/cms-kit-admin/contentBoxes',
    deleteContentBox: 'http://172.16.23.2/api/api/cms-kit-admin/contentBoxes/',
    getContentBox: 'http://172.16.23.2/api/api/cms-kit-admin/contentBoxes/',
    editContentBox: 'http://172.16.23.2/api/api/cms-kit-admin/contentBoxes/',
    appDemos: {
        demo1: {
            title: 'Demo 1',
            description: 'Default Dashboard',
            published: true,
            thumbnail: './assets/media/demos/demo1.png',
        }
    }
};
