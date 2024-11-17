export const apiUrl = {
    base: 'http://api.avreenco.com',
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
    loginUrl: apiUrl.base + '/api/account/login',
    getConfiguration: apiUrl.base + '/Abp/ApplicationConfigurationScript',
    getUserByToken: apiUrl.base + '/api/account/my-profile',
    getAntiForgery: apiUrl.base + '/api/antiforgery',
    SetCsrfCookie: apiUrl.base + '/api/cms-kit-public/SetCsrfCookie',
    //BOX ITEMS SERVICES//
    addNewBoxItem: apiUrl.base + '/api/app/box-item-admin',
    getBoxItems: apiUrl.base + '/api/app/box-admin/box-items/',
    deleteBoxItem: apiUrl.base + '/api/app/box-item-admin/',
    uploadMedia: apiUrl.base + '/api/cms-kit-admin/media/',
    downloadMedia: apiUrl.base + '/api/cms-kit/media/',
    getBoxItemInfo: apiUrl.base + '/api/app/box-item-admin/',
    editBoxItem: apiUrl.base + '/api/app/box-item-admin/',
    //BOX SERVICES//
    deleteBox: apiUrl.base + '/api/app/box-admin/',
    getAllBoxes: apiUrl.base + '/api/app/box-admin',
    addNewBox: apiUrl.base + '/api/app/box-admin',
    getBoxInfo: apiUrl.base + '/api/app/box-admin/',
    editBox: apiUrl.base + '/api/app/box-admin/',
    //BLOG CATEGORY SERVICES//
    getAllCategories: apiUrl.base + '/api/cms-kit-admin/blogs',
    addNewCategory: apiUrl.base + '/api/cms-kit-admin/blogs',
    deleteCategory: apiUrl.base + '/api/cms-kit-admin/blogs/',
    getCategory: apiUrl.base + '/api/cms-kit-admin/blogs/',
    editCategory: apiUrl.base + '/api/cms-kit-admin/blogs/',
    //BLOG TAG SERVICES//
    getAllTags: apiUrl.base + '/api/cms-kit-admin/tags',
    addNewTag: apiUrl.base + '/api/cms-kit-admin/tags',
    deleteTag: apiUrl.base + '/api/cms-kit-admin/tags/',
    getTag: apiUrl.base + '/api/cms-kit-admin/tags/',
    editTag: apiUrl.base + '/api/cms-kit-admin/tags/',
    //BLOG SERVICES//
    getAllBlogPosts: apiUrl.base + '/api/cms-kit-admin/blogs/blog-posts',
    addNewBlogPost: apiUrl.base + '/api/cms-kit-admin/blogs/blog-posts/create-and-publish',
    deleteBlogPost: apiUrl.base + '/api/cms-kit-admin/blogs/blog-posts/',
    editBlogPost: apiUrl.base + '/api/cms-kit-admin/blogs/blog-posts/',
    getBlogPost: apiUrl.base + '/api/cms-kit-admin/blogs/blog-posts/',
    getBlogPostTags: apiUrl.base + '/api/cms-kit-public/tags/',
    submitTag: apiUrl.base + '/api/cms-kit-admin/entity-tags',
    //PAGES SERVICES//
    getAllPages: apiUrl.base + '/api/cms-kit-admin/pages',
    addNewPage: apiUrl.base + '/api/cms-kit-admin/blogs',
    deletePage: apiUrl.base + '/api/cms-kit-admin/blogs/',
    // addNewBox: apiUrl.base + '/api/app/box-admin',
    // getBoxInfo: apiUrl.base + '/api/app/box-admin/',
    // editBox: apiUrl.base + '/api/app/box-admin/',
    //USER SERVICES//
    getAllUsers: apiUrl.base + '/api/identity/users',
    //ROLE SERVICES//
    getAllRoles: apiUrl.base + '/api/identity/roles',
    //MENU SERVICES//
    getAllMenus: apiUrl.base + '/api/app/menu-item-admin',
    getMenuTree: apiUrl.base + '/api/cms-kit-public/menu-items/get-tree',
    addNewMenu: apiUrl.base + '/api/cms-kit-admin/menu-items',
    deleteMenu: apiUrl.base + '/api/cms-kit-admin/menu-items/',
    getMenuInfo: apiUrl.base + '/api/cms-kit-admin/menu-items/',
    editMenu: apiUrl.base + '/api/cms-kit-admin/menu-items/',
    //CONTENT BOX SERVICES//
    getContentBoxRoot: apiUrl.base + '/api/cms-kit-public/contentBoxes/by-parent',
    getContentBoxTree: apiUrl.base + '/api/cms-kit-public/contentBoxes/get-tree',
    getContentBoxTreeById: apiUrl.base + '/api/cms-kit-public/contentBoxes/get-tree-by-id',
    addNewContentBox: apiUrl.base + '/api/cms-kit-admin/contentBoxes',
    deleteContentBox: apiUrl.base + '/api/cms-kit-admin/contentBoxes/',
    getContentBox: apiUrl.base + '/api/cms-kit-admin/contentBoxes/',
    editContentBox: apiUrl.base + '/api/cms-kit-admin/contentBoxes/',
    appDemos: {
        demo1: {
            title: 'Demo 1',
            description: 'Default Dashboard',
            published: true,
            thumbnail: './assets/media/demos/demo1.png',
        }
    }
};
