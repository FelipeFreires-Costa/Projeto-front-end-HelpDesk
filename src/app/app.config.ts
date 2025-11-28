import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; // <--- Importante
import { routes } from './app.routes';           // <--- Importante (suas rotas)

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Configuração de Rotas (necessário para o navigate funcionar)
    provideRouter(routes),

    // 2. Configuração do HTTP com o Interceptor (necessário para o token)
    provideHttpClient(withInterceptors([AuthInterceptor]))
  ]
};