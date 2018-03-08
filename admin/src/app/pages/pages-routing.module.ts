import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './pages.component';

const routes: Routes = [
    {
        path: '', component: PageComponent,
        children: [
            // { path: 'login', loadChildren: '../login/login.module#LoginModule' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'all-devices', loadChildren: './devices/all-devices/all-devices.module#DevicesModule' },
            { path: 'add-devices', loadChildren: './devices/add-devices/add-devices.module#AddDevicesModule' },
            { path: 'edit-devices', loadChildren: './devices/edit-devices/edit-devices.module#EditDevicesModule' },
            { path: 'all-accounts', loadChildren: './accounts/all-accounts/all-accounts.module#AllAccountsModule' },
            { path: 'add-accounts', loadChildren: './accounts/add-accounts/add-accounts.module#AddAccountsModule' },
            { path: 'edit-accounts', loadChildren: './accounts/edit-accounts/edit-accounts.module#EditAccountsModule' },
            { path: 'all-roles', loadChildren: './roles/all-roles/all-roles.module#AllRolesModule' },
            { path: 'add-role', loadChildren: './roles/add-roles/add-roles.module#AddRolesModule' },
            { path: 'edit-role', loadChildren: './roles/edit-roles/edit-roles.module#EditRolesModule' },
            { path: 'activity-log', loadChildren: './accounts/account-logs/account-logs.module#AccountLogsModule' },
            { path: 'activity-log', loadChildren: './accounts/account-logs/account-logs.module#AccountLogsModule' },
            { path: 'order-history', loadChildren: './orders/order-history/order-history.module#OrderHistoryModule' },
            { path: 'order-details', loadChildren: './orders/order-details/order-details.module#OrderDetailsModule' },
            { path: 'subscription', loadChildren: './subscriptions/subscriptions.module#SubscriptionsModule' },
            { path: 'upgrade-plans', loadChildren: './upgrade-plans/upgrade-plans.module#UpgradePlansModule' },
            { path: 'payment', loadChildren: './payment/payment-main/payment-main.module#PaymentMainModule' },
            { path: 'payment-failed', loadChildren: './payment/payment-failed/payment-failed.module#PaymentFailedModule' },
            { path: 'payment-success', loadChildren: './payment/payment-success/payment-success.module#PaymentSuccessModule' },
            { path: 'company-profile', loadChildren: './profiles/company-profile/company-profile.module#CompanyProfileModule' },
            { path: 'add-company-card', loadChildren: './profiles/company-card/add-company-card/add-company-card.module#AddCompanyCardModule' },
            { path: 'all-company-card', loadChildren: './profiles/company-card/all-company-cards/all-company-cards.module#AllCompanyCardsModule' },
            { path: 'edit-company-card', loadChildren: './profiles/company-card/edit-company-card/edit-company-card.module#EditCompanyCardModule' },

            { path: 'starter', loadChildren: './starter/starter.module#StarterModule' },
            { path: 'accordion', loadChildren: './component/accordion/accordion.module#AccordionModule' },
            { path: 'alert', loadChildren: './component/alert/alert.module#NgAlertModule' },
            { path: 'carousel', loadChildren: './component/carousel/carousel.module#ButtonsModule' },
            { path: 'datepicker', loadChildren: './component/datepicker/datepicker.module#DatepickerModule' },
            { path: 'dropdown', loadChildren: './component/dropdown-collapse/dropdown-collapse.module#DropdownModule' },
            { path: 'modal', loadChildren: './component/modal/modal.module#ModalModule' },
            { path: 'pagination', loadChildren: './component/pagination/pagination.module#paginationModule' },
            { path: 'poptool', loadChildren: './component/popover-tooltip/popover-tooltip.module#PopoverTooltipModule' },
            { path: 'progressbar', loadChildren: './component/progressbar/progressbar.module#progressbarModule' },
            { path: 'rating', loadChildren: './component/rating/rating.module#RatingModule' },
            { path: 'tabs', loadChildren: './component/tabs/tabs.module#TabsModule' },
            { path: 'timepicker', loadChildren: './component/timepicker/timepicker.module#TimepickerModule' },
            { path: 'typehead', loadChildren: './component/typehead/typehead.module#TypeheadModule' },
            { path: 'fontawesome', loadChildren: './icons/fontawesome/fontawesome.module#FontawesomeModule' },
            { path: 'simpleline', loadChildren: './icons/simpleline/simpleline.module#SimplelineIconModule' },
            { path: 'material', loadChildren: './icons/material/material.module#MaterialComponentModule' },
            { path: 'basicform', loadChildren: './form/basic/basic.module#BasicFormModule' },
            { path: 'wizard', loadChildren: './form/wizard/wizard.module#WizardFormModule' },
            { path: 'basictable', loadChildren: './table/basic/basic.module#BasicTableModule' },
            { path: 'kendo', loadChildren: './kendo/kendo.module#KendoModule' },
            { path: 'http-observable', loadChildren: './observable/http-observable/http-observable.module#HttpObservableModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
