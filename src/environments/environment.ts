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
    getUserByToken: '/api/account/my-profile',
    //BOX ITEMS SERVICES//
    addNewBoxItem: '/api/app/box-item-admin',
    getBoxItems: '/api/app/box-admin/box-items/',
    uploadMedia: '/api/cms-kit-admin/media/Box',
    //BOX SERVICES//
    deleteBox: '/api/app/box/',
    getAllBoxes: '/api/app/box-admin',
    addNewBox: '/api/app/box-admin',
    getBoxInfo: '/api/app/box/',
    editBox: '/api/app/box/',
    //USER SERVICES//
    getAllUsers: '/api/identity/users',
    //ROLE SERVICES//
    getAllRoles: '/api/identity/roles',
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
