import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore } from '@ngrx/router-store';
import { AppEffect, AppReducer } from './store/app.state';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideNgToast } from 'ng-angular-popup';
import { CustomSerializer } from './store/router/custom-route-serializer';
import { employeeInterceptor } from './interceptor/employee-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([employeeInterceptor])),
    provideStore(AppReducer),
    provideEffects(AppEffect),
    provideRouterStore({
      serializer: CustomSerializer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideNgToast({
      duration: 5000, // Default 5 seconds
      maxToasts: 3, // Max 3 toasts at once
      width: 400, // Toast width in pixels
      showProgress: true, // Show progress bar
      dismissible: true, // Allow manual dismiss
      showIcon: true, // Show icons
      enableAnimations: true,
    }),
  ],
};
