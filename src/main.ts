import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app'; // Verifique se é .component ou apenas .app no seu projeto
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// 1. IMPORTAR AS FUNÇÕES DO INTERCEPTOR
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    // 2. AQUI ESTAVA O ERRO!
    // Antes estava só provideHttpClient().
    // Agora estamos "ligando" o interceptor explicitamente:
    provideHttpClient(withInterceptors([authInterceptor])),

    importProvidersFrom(
      BrowserAnimationsModule,
      ToastrModule.forRoot()
    )
  ]
}).catch(err => console.error(err));