import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'requests', loadChildren: './requests/requests.module#RequestsPageModule' },
  { path: 'seasons', loadChildren: './seasons/seasons.module#SeasonsPageModule' },
  { path: 'farms', loadChildren: './farms/farms.module#FarmsPageModule' },
  { path: 'farmers', loadChildren: './farmers/farmers.module#FarmersPageModule' },
  { path: 'farmer-view', loadChildren: './farmer-view/farmer-view.module#FarmerViewPageModule' },
  { path: 'farmer-form', loadChildren: './farmer-form/farmer-form.module#FarmerFormPageModule' },
  { path: 'farm-view', loadChildren: './farm-view/farm-view.module#FarmViewPageModule' },
  { path: 'farm-form', loadChildren: './farm-form/farm-form.module#FarmFormPageModule' },
  { path: 'request-view', loadChildren: './request-view/request-view.module#RequestViewPageModule' },
  { path: 'request-form', loadChildren: './request-form/request-form.module#RequestFormPageModule' },
  { path: 'season-view', loadChildren: './season-view/season-view.module#SeasonViewPageModule' },
  { path: 'season-form', loadChildren: './season-form/season-form.module#SeasonFormPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
