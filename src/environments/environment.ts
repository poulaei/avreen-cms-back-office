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
    loginUrl: '/api/account/login',
    getConfiguration: '/Abp/ApplicationConfigurationScript',
    getUserByToken: '/api/account/my-profile',
    //BOX ITEMS SERVICES//
    addNewBoxItem: '/api/app/box-item-admin',
    getBoxItems: '/api/app/box-admin/box-items/',
    deleteBoxItem: '/api/app/box-item-admin/',
    uploadMedia: '/api/cms-kit-admin/media/',
    downloadMedia: '/api/cms-kit/media/',
    getBoxItemInfo: '/api/app/box-item-admin/',
    editBoxItem: '/api/app/box-item-admin/',
    //BOX SERVICES//
    deleteBox: '/api/app/box-admin/',
    getAllBoxes: '/api/app/box-admin',
    addNewBox: '/api/app/box-admin',
    getBoxInfo: '/api/app/box-admin/',
    editBox: '/api/app/box-admin/',
    //BLOG CATEGORY SERVICES//
    getAllCategories: '/api/cms-kit-admin/blogs',
    addNewCategory: '/api/cms-kit-admin/blogs',
    deleteCategory: '/api/cms-kit-admin/blogs/',
    getCategory: '/api/cms-kit-admin/blogs/',
    editCategory: '/api/cms-kit-admin/blogs/',
    //BLOG TAG SERVICES//
    getAllTags: '/api/cms-kit-admin/tags',
    addNewTag: '/api/cms-kit-admin/tags',
    deleteTag: '/api/cms-kit-admin/tags/',
    getTag: '/api/cms-kit-admin/tags/',
    editTag: '/api/cms-kit-admin/tags/',
    //BLOG SERVICES//
    getAllBlogPosts: '/api/cms-kit-admin/blogs/blog-posts',
    addNewBlogPost: '/api/cms-kit-admin/blogs/blog-posts/create-and-publish',
    deleteBlogPost: '/api/cms-kit-admin/blogs/blog-posts/',
    editBlogPost: '/api/cms-kit-admin/blogs/blog-posts/',
    getBlogPost: '/api/cms-kit-admin/blogs/blog-posts/',
    getBlogPostTags: '/api/cms-kit-public/tags/',
    submitTag: '/api/cms-kit-admin/entity-tags',
    //PAGES SERVICES//
    getAllPages: '/api/cms-kit-admin/pages',
    addNewPage: '/api/cms-kit-admin/blogs',
    deletePage: '/api/cms-kit-admin/blogs/',
    // addNewBox: '/api/app/box-admin',
    // getBoxInfo: '/api/app/box-admin/',
    // editBox: '/api/app/box-admin/',
    //USER SERVICES//
    getAllUsers: '/api/identity/users',
    //ROLE SERVICES//
    getAllRoles: '/api/identity/roles',
    //MENU SERVICES//
    getAllMenus: '/api/app/menu-item-admin',
    getMenuTree: '/api/cms-kit-public/menu-items/get-tree',
    addNewMenu: '/api/cms-kit-admin/menu-items',
    deleteMenu: '/api/cms-kit-admin/menu-items/',
    getMenuInfo: '/api/cms-kit-admin/menu-items/',
    editMenu: '/api/cms-kit-admin/menu-items/',
    //CONTENT BOX SERVICES//
    getContentBoxRoot: '/api/cms-kit-public/contentBoxes/by-parent',
    getContentBoxTree: '/api/cms-kit-public/contentBoxes/get-tree',
    getContentBoxTreeById: '/api/cms-kit-public/contentBoxes/get-tree-by-id',
    addNewContentBox: '/api/cms-kit-admin/contentBoxes',
    deleteContentBox: '/api/cms-kit-admin/contentBoxes/',
    getContentBox: '/api/cms-kit-admin/contentBoxes/',
    editContentBox: '/api/cms-kit-admin/contentBoxes/',
    appDemos: {
        demo1: {
            title: 'Demo 1',
            description: 'Default Dashboard',
            published: true,
            thumbnail: './assets/media/demos/demo1.png',
        }
    },
    apis: {
        default: {
            url: '', // <- should be empty string, not '/'
            // ...
        },
    }
};
