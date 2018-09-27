import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules, UrlSerializer } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DefaultUrlSerializer, UrlTree } from '@angular/router';
//import { BrowserModule }                from '@angular/platform-browser';
//import { ReactiveFormsModule }          from '@angular/forms';
//import { NgModule }                     from '@angular/core';

//import { AppComponent }                 from './app.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

//import { HttpClientModule } from '@angular/common/http';

// import {NgTableSortingDirective} from './ng-table-sorting.directive';

// Material 2
import 'hammerjs';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { SurveyComponent } from './survey';
import { FormSectionComponent } from './form-section';

export class LowerCaseUrlSerializer extends DefaultUrlSerializer {
  parse(url: string): UrlTree {
    return super.parse(url.toLowerCase());
  }
}

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ]
})
export class AngMaterialModule { }

@NgModule({
  exports: [

  ]
})
export class PrimeNGModule { }


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    SurveyComponent,
    FormSectionComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngMaterialModule,
    HttpModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    PrimeNGModule,
    //IndexedDBAngular,
    RouterModule.forRoot(ROUTES, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS,
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer
    }

  ]
})


// /ref: https://stackoverflow.com/questions/42065409/angular-2-routes-3-0-case-sensitive



export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) { }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    // console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}


