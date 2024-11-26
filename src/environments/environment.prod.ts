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
    loginUrl: 'https://royancancer.org/api/api/account/login',
    getConfiguration: 'https://royancancer.org/api/Abp/ApplicationConfigurationScript',
    getUserByToken: 'https://royancancer.org/api/api/account/my-profile',
    //BOX ITEMS SERVICES//
    addNewBoxItem: 'https://royancancer.org/api/api/app/box-item-admin',
    getBoxItems: 'https://royancancer.org/api/api/app/box-admin/box-items/',
    deleteBoxItem: 'https://royancancer.org/api/api/app/box-item-admin/',
    uploadMedia: 'https://royancancer.org/api/api/cms-kit-admin/media/',
    downloadMedia: 'https://royancancer.org/api/api/cms-kit/media/',
    getBoxItemInfo: 'https://royancancer.org/api/api/app/box-item-admin/',
    editBoxItem: 'https://royancancer.org/api/api/app/box-item-admin/',
    //BOX SERVICES//
    deleteBox: 'https://royancancer.org/api/api/app/box-admin/',
    getAllBoxes: 'https://royancancer.org/api/api/app/box-admin',
    addNewBox: 'https://royancancer.org/api/api/app/box-admin',
    getBoxInfo: 'https://royancancer.org/api/api/app/box-admin/',
    editBox: 'https://royancancer.org/api/api/app/box-admin/',
    //BLOG CATEGORY SERVICES//
    getAllCategories: 'https://royancancer.org/api/api/cms-kit-admin/blogs',
    addNewCategory: 'https://royancancer.org/api/api/cms-kit-admin/blogs',
    deleteCategory: 'https://royancancer.org/api/api/cms-kit-admin/blogs/',
    getCategory: 'https://royancancer.org/api/api/cms-kit-admin/blogs/',
    editCategory: 'https://royancancer.org/api/api/cms-kit-admin/blogs/',
    //BLOG TAG SERVICES//
    getAllTags: 'https://royancancer.org/api/api/cms-kit-admin/tags',
    addNewTag: 'https://royancancer.org/api/api/cms-kit-admin/tags',
    deleteTag: 'https://royancancer.org/api/api/cms-kit-admin/tags/',
    getTag: 'https://royancancer.org/api/api/cms-kit-admin/tags/',
    editTag: 'https://royancancer.org/api/api/cms-kit-admin/tags/',
    //BLOG SERVICES//
    getAllBlogPosts: 'https://royancancer.org/api/api/cms-kit-admin/blogs/blog-posts',
    addNewBlogPost: 'https://royancancer.org/api/api/cms-kit-admin/blogs/blog-posts/create-and-publish',
    deleteBlogPost: 'https://royancancer.org/api/api/cms-kit-admin/blogs/blog-posts/',
    editBlogPost: 'https://royancancer.org/api/api/cms-kit-admin/blogs/blog-posts/',
    getBlogPost: 'https://royancancer.org/api/api/cms-kit-admin/blogs/blog-posts/',
    getBlogPostTags: 'https://royancancer.org/api/api/cms-kit-public/tags/',
    submitTag: 'https://royancancer.org/api/api/cms-kit-admin/entity-tags',
    //PAGES SERVICES//
    getAllPages: 'https://royancancer.org/api/api/cms-kit-admin/pages',
    addNewPage: 'https://royancancer.org/api/api/cms-kit-admin/blogs',
    deletePage: 'https://royancancer.org/api/api/cms-kit-admin/blogs/',
    // addNewBox: '/api/app/box-admin',
    // getBoxInfo: '/api/app/box-admin/',
    // editBox: '/api/app/box-admin/',
    //USER SERVICES//
    getAllUsers: 'https://royancancer.org/api/api/identity/users',
    //ROLE SERVICES//
    getAllRoles: 'https://royancancer.org/api/api/identity/roles',
    //MENU SERVICES//
    getAllMenus: 'https://royancancer.org/api/api/app/menu-item-admin',
    getMenuTree: 'https://royancancer.org/api/api/cms-kit-public/menu-items/get-tree',
    addNewMenu: 'https://royancancer.org/api/api/cms-kit-admin/menu-items',
    deleteMenu: 'https://royancancer.org/api/api/cms-kit-admin/menu-items/',
    getMenuInfo: 'https://royancancer.org/api/api/cms-kit-admin/menu-items/',
    editMenu: 'https://royancancer.org/api/api/cms-kit-admin/menu-items/',
    //CONTENT BOX SERVICES//
    getContentBoxRoot: 'https://royancancer.org/api/api/cms-kit-public/contentBoxes/by-parent',
    getContentBoxTree: 'https://royancancer.org/api/api/cms-kit-public/contentBoxes/get-tree',
    getContentBoxTreeById: 'https://royancancer.org/api/api/cms-kit-public/contentBoxes/get-tree-by-id',
    addNewContentBox: 'https://royancancer.org/api/api/cms-kit-admin/contentBoxes',
    deleteContentBox: 'https://royancancer.org/api/api/cms-kit-admin/contentBoxes/',
    getContentBox: 'https://royancancer.org/api/api/cms-kit-admin/contentBoxes/',
    editContentBox: 'https://royancancer.org/api/api/cms-kit-admin/contentBoxes/',
    appDemos: {
        demo1: {
            title: 'Demo 1',
            description: 'Default Dashboard',
            published: true,
            thumbnail: './assets/media/demos/demo1.png',
        }
    }
};
