import { Routes } from '@angular/router';
import { CatalogPage, AppCatalogPageItem } from './feature/catalog/catalog.component'
import { AdminUpdatePage, AdminCreatePage } from './feature/admin/admin.component'
import { AuthLoginPage } from './feature/auth/auth.component'
import { NotFound } from './app'

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'catalog',
        pathMatch: 'full'
    },

    {
        path: 'catalog',
        children: [
            {
                path: '',
                component: CatalogPage,
                pathMatch: 'full'
            },
            {
                path: ':name',
                component: AppCatalogPageItem
            }
        ]
    },

    {
        path: 'login',
        component: AuthLoginPage
    },

    {
        path: 'admin',
        children: [
            {
                path: 'create',
                component: AdminCreatePage
            },
            {
                path: 'update/:name',
                component: AdminUpdatePage
            }
        ]
    },

    {
        path: '**',
        component: NotFound
    },
];