"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routing = void 0;
var Routing = [
    {
        path: '',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./home/home.module'); }).then(function (m) { return m.HomeModule; }); },
        data: { layout: 'empty-layout' }
    },
    {
        path: 'dashboard',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./dashboard/dashboard.module'); }).then(function (m) { return m.DashboardModule; }); },
        data: { layout: 'empty-layout' }
    },
    {
        path: 'map',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./map/map.module'); }).then(function (m) { return m.MapModule; }); },
        data: { layout: 'light-header' }
    },
    {
        path: '**',
        redirectTo: 'error/404',
    },
];
exports.Routing = Routing;
//# sourceMappingURL=routing.js.map