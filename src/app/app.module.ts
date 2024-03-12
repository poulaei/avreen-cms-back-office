import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {ClipboardModule} from 'ngx-clipboard';
import {TranslateModule} from '@ngx-translate/core';
import {InlineSVGModule} from 'ng-inline-svg-2';
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthService} from './modules/auth';
import {environment} from 'src/environments/environment';
// #fake-start#
import {FakeAPIService} from './_fake';
import {RoyanComponent} from './modules/royan/royan.component';
import {MatPaginatorIntl} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TokenInterceptor} from "./modules/royan/shared/shared-service/token-Interceptor";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {
  MaterialPersianDateAdapter,
  PERSIAN_DATE_FORMATS
} from "./modules/royan/shared/adapter/material.persian.date.adapter";
import {NgxSpinnerModule} from "ngx-spinner";
import {SpinnerInterceptor} from "./spinne-interceptor";
import {ToastrModule} from "ngx-toastr";
import {MatMenuModule} from "@angular/material/menu";

// #fake-end#

const dutchRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) {
    return `0 از ${length}`;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} از ${length}`;
};

function appInitializer(authService: AuthService) {
  return () => {
    return new Promise((resolve) => {
      //@ts-ignore
      authService.getUserByToken().subscribe().add(resolve);
    });
  };
}

@NgModule({
  declarations: [AppComponent, RoyanComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    ClipboardModule,
    // #fake-start#
    environment.isMockEnabled ? HttpClientInMemoryWebApiModule.forRoot(FakeAPIService, {
      passThruUnknownUrl: true,
      dataEncapsulation: false,
    }) : [],
    // #fake-end#
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    NgbModule,
    MatSelectModule,
    MatMenuModule,
    MatDatepickerModule,
    MatTooltipModule,
    NgxSpinnerModule.forRoot({
      type: 'ball-spin-clockwise-fade',
    }),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-left',
      progressBar: true,
      progressAnimation: 'decreasing',
      newestOnTop: true,
      closeButton: true
    }),
  ],
  providers: [
    NgbActiveModal,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {provide: MatPaginatorIntl, useValue: CustomPaginator()},
    {provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS},
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}


export function CustomPaginator() {
  const customPaginator = new MatPaginatorIntl();
  customPaginator.itemsPerPageLabel = 'تعداد رکورد در هر صفحه : ';
  customPaginator.firstPageLabel = 'صفحه اول';
  customPaginator.lastPageLabel = 'صفحه آخر';
  customPaginator.nextPageLabel = 'صفحه بعد';
  customPaginator.previousPageLabel = 'صفحه قبل';
  customPaginator.getRangeLabel = dutchRangeLabel;
  return customPaginator;
}
