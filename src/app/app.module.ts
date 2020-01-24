// tslint:disable: max-line-length
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { environment } from '../environments/environment';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
  AngularFireAuthGuardModule
} from '@angular/fire/auth-guard';

// 3rd Party Modules
import { NgxHmCarouselModule } from 'ngx-hm-carousel';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Components
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { MembersComponent } from './members/members.component';
import { DeliComponent } from './deli/deli.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { PostsComponent } from './profile/posts/posts.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { InfoComponent } from './info/info.component';
import { EventsComponent } from './profile/events/events.component';
import { ArtistsComponent } from './profile/artists/artists.component';
import { ChatComponent } from './chat/chat.component';
import { PrimePostComponent } from './prime-post/prime-post.component';
import { EventComponent } from './event/event.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { UsernameFormComponent } from './username-form/username-form.component';
import { SellerComponent } from './seller/seller.component';
import { ConnectComponent } from './connect/connect.component';
import { BuyPostComponent } from './buy-post/buy-post.component';
import { TermsComponent } from './terms/terms.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { ServicesComponent } from './profile/services/services.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { InquireFormComponent } from './inquire-form/inquire-form.component';
import { OrdersComponent } from './orders/orders.component';
import { ViewingServiceComponent } from './viewing-service/viewing-service.component';
import { BoughtServicesComponent } from './orders/bought-services/bought-services.component';
import { SoldServicesComponent } from './orders/sold-services/sold-services.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentListComponent } from './comments/comment-list/comment-list.component';
import { CommentFormComponent } from './comments/comment-form/comment-form.component';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
import { FaqComponent } from './faq/faq.component';
import { CollectPaymentComponent } from './collect-payment/collect-payment.component';
import { SignupSuccessComponent } from './signup-success/signup-success.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { CategorySelectComponent } from './deli/category-select/category-select.component';
import { PostLayoutComponent } from './post-layout/post-layout.component';
import { PostThumbnailComponent } from './post-layout/post-thumbnail/post-thumbnail.component';
import { DeliHeaderComponent } from './deli/deli-header/deli-header.component';
import { DescriptionBoxComponent } from './post/description-box/description-box.component';
import { CommentBoxComponent } from './post/comment-box/comment-box.component';
import { PostImagesComponent } from './post/post-images/post-images.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { WidescreenHeaderComponent } from './nav/widescreen-header/widescreen-header.component';
import { MobileHeaderComponent } from './nav/mobile-header/mobile-header.component';
import { SidenavComponent } from './nav/sidenav/sidenav.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const redirectLoggedInToDeli = () => redirectLoggedInTo(['deli']);

const routes: Routes = [
  { path: '', redirectTo: '/deli', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'deli', component: DeliComponent },
  { path: 'exhibitions', loadChildren: () => import('./exhibitions-module/exhibitions-module.module').then(m => m.ExhibitionsModuleModule) },
  { path: 'calendar', loadChildren: () => import('./calendar-module/calendar-module.module').then(m => m.CalendarModuleModule) },
  { path: 'members', component: MembersComponent },
  { path: 'new-post', component: CreatePostComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'info', component: InfoComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'seller', component: SellerComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'subscriptions', redirectTo: '/about?subscriptions=true', pathMatch: 'full' },
  { path: 'prime-cuts/:id', component: PrimePostComponent },
  { path: 'post/:id', component: PostComponent },
  { path: 'event/:id', component: EventComponent },
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToDeli } },
  { path: 'purchase/:id', component: BuyPostComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'order-details/:id', component: OrderDetailsComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'terms', component: TermsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'connect', component: ConnectComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin} },
  { path: ':username', component: ProfileComponent },
  { path: '**', redirectTo: '/deli', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    MembersComponent,
    DeliComponent,
    NavComponent,
    FooterComponent,
    ProfileComponent,
    LoginComponent,
    PostsComponent,
    PostComponent,
    InfoComponent,
    EventsComponent,
    ArtistsComponent,
    ChatComponent,
    PrimePostComponent,
    EventComponent,
    PaymentFormComponent,
    UsernameFormComponent,
    SellerComponent,
    ConnectComponent,
    BuyPostComponent,
    TermsComponent,
    CreatePostComponent,
    ServicesComponent,
    CreateServiceComponent,
    InquireFormComponent,
    OrdersComponent,
    ViewingServiceComponent,
    BoughtServicesComponent,
    SoldServicesComponent,
    PostLayoutComponent,
    NotificationsComponent,
    CommentsComponent,
    CommentListComponent,
    CommentFormComponent,
    SignupDialogComponent,
    FaqComponent,
    CollectPaymentComponent,
    SignupSuccessComponent,
    AddressFormComponent,
    CategorySelectComponent,
    PostThumbnailComponent,
    DeliHeaderComponent,
    DescriptionBoxComponent,
    CommentBoxComponent,
    PostImagesComponent,
    FooterBarComponent,
    EditProfileComponent,
    WidescreenHeaderComponent,
    MobileHeaderComponent,
    SidenavComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    NgxHmCarouselModule,
    InfiniteScrollModule
  ],
  exports: [
    MaterialModule
  ],
  entryComponents: [
    InquireFormComponent,
    SignupDialogComponent
  ],
  providers: [
    AngularFireAuthGuard,
    ScreenTrackingService,
    UserTrackingService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
