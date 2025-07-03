import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FaqComponent } from './pages/faq/faq.component';
import { TermsComponent } from './pages/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NutritionComponent } from './pages/nutrition/nutrition.component';
import { HalalPolicyComponent } from './pages/halal-policy/halal-policy.component';
import { FranchiseComponent } from './pages/franchise/franchise.component';
import { CateringComponent } from './pages/catering/catering.component';
import { MenuComponent } from './pages/menu/menu.component';
import { AboutComponent } from './pages/about/about.component';
import { MenuImgComponent } from './pages/menu-img/menu-img.component';

const routes: Routes = [
  {
    path : "",
    redirectTo : "home",
    pathMatch: 'full' 
  },
  {
    path : "home",
    component : HomeComponent
  },
  {
    path : "about", 
    component : AboutComponent
  },
  // {
  //   path : "menu",
  //   component : MenuComponent
  // },
  {
    path : "menu",
    component : MenuImgComponent 
  },
  {
    path : "services/franchise",
    component : FranchiseComponent
  },
  {
    path : "services/catering_&_party",
    component : CateringComponent
  },
  {
    path : "help/faq",
    component : FaqComponent
  },
  {
    path : "contactus",
    component : ContactComponent
  },
  {
    path : "help/T&C",
    component : TermsComponent
  },
  {
    path : "ourfood/nutrition_facts",
    component : NutritionComponent
  },
  {
    path : "ourfood/halal_policy",
    component : HalalPolicyComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
