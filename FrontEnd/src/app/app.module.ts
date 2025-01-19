import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BottomBarComponent } from './components/footer/bottom-bar/bottom-bar.component';
import { MainFooterComponent } from './components/footer/main-footer/main-footer.component';
import { HeaderBarComponent } from './components/header/header-bar/header-bar.component';
import { HeaderLinkComponent } from './components/header/header-link/header-link.component';
import { ButtonCtaComponent } from './components/button-cta/button-cta.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderLogoComponent } from './components/header/header-logo/header-logo.component';
import { HeaderLinksComponent } from './components/header/header-links/header-links.component';
import { FooterColumnComponent } from './components/footer/footer-column/footer-column.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { BreadcrumbComponent } from './components/section/breadcrumb/breadcrumb.component';
import { PageComponent } from './components/page/page.component';
import { HowtodonateComponent } from './pages/howtodonate/howtodonate.component';
import { AssociationApplyComponent } from './pages/association-apply/association-apply.component';
import { AssociationInfoComponent } from './pages/association-apply/association-info/association-info.component';
import { CreateFundComponent } from './pages/create-fund/create-fund.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { FaqComponent } from './pages/faq/faq.component';
import { AssociationsComponent } from './pages/associations/associations.component';
import { PotsComponent } from './pages/pots/pots.component';
import { DetailComponent } from './pages/pots/detail/detail.component';
import { AssociationDetailComponent } from './pages/associations/association-detail/association-detail.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DonationComponent } from './pages/donation/donation.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './pages/admin/admin.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PotResolver } from './resolvers/pot-resolver.service';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { AssociationResolver } from './resolvers/association-resolver.service';
import { Web3Service } from './services/web3.service';


@NgModule({
  declarations: [
    AppComponent,
    BottomBarComponent,
    MainFooterComponent,
    HeaderBarComponent,
    HeaderLinkComponent,
    ButtonCtaComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HeaderLogoComponent,
    HeaderLinksComponent,
    FooterColumnComponent,
    AboutusComponent,
    BreadcrumbComponent,
    PageComponent,
    HowtodonateComponent,
    AssociationApplyComponent,
    AssociationInfoComponent,
    CreateFundComponent,
    TermsComponent,
    PrivacyComponent,
    FaqComponent,
    AssociationsComponent,
    PotsComponent,
    DetailComponent,
    AssociationDetailComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    DonationComponent,
    AdminComponent,
    UserProfileComponent,
    NotfoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    PotResolver,
    AssociationResolver,
    Web3Service
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
