import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonationComponent } from './pages/donation/donation.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { AssociationApplyComponent } from './pages/association-apply/association-apply.component';
import { AssociationInfoComponent } from './pages/association-apply/association-info/association-info.component';
import { AssociationDetailComponent } from './pages/associations/association-detail/association-detail.component';
import { AssociationsComponent } from './pages/associations/associations.component';
import { CreateFundComponent } from './pages/create-fund/create-fund.component';
import { FaqComponent } from './pages/faq/faq.component';
import { HomeComponent } from './pages/home/home.component';
import { HowtodonateComponent } from './pages/howtodonate/howtodonate.component';
import { LoginComponent } from './pages/login/login.component';
import { DetailComponent } from './pages/pots/detail/detail.component';
import { PotsComponent } from './pages/pots/pots.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TermsComponent } from './pages/terms/terms.component';
import { AuthGuard } from './services/auth-guard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { PotResolver } from './resolvers/pot-resolver.service';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AssociationResolver } from './resolvers/association-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about-us',
    component: AboutusComponent,
  },
  {
    path: 'how-to-donate',
    component: HowtodonateComponent,
  },
  {
    path: 'apply',
    component: AssociationApplyComponent,
  },
  {
    path: 'apply/association',
    component: AssociationInfoComponent,
  },
  {
    path: 'create-fund',
    component: CreateFundComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
  {
    path: 'pots',
    component: PotsComponent,
  },
  {
    path: 'pot/:id',
    component: DetailComponent,
    resolve: { message: PotResolver },
  },
  {
    path: 'associations',
    component: AssociationsComponent,
  },
  {
    path: 'association/:id',
    component: AssociationDetailComponent,
    resolve: { message: AssociationResolver },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'donation',
    component: DonationComponent,
  },
  {
    path: 'administration',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', pathMatch: 'full', component: NotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
