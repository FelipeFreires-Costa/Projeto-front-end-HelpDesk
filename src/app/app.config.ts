import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// 1. TEM QUE TER O 'withInterceptors' AQUI
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// 2. TEM QUE IMPORTAR SEU ARQUIVO CORRETAMENTE
import { authInterceptor } from './interceptors/auth.interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    
    // 3. ESSA LINHA É OBRIGATÓRIA. SE ELA NÃO EXISTIR, O TOKEN NÃO SAI DO PC.
    provideHttpClient(withInterceptors([authInterceptor])) 
  ]
};