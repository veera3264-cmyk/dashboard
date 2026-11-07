import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (
  req,
  next
) => {

  if (
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/signup')
  ) {
    return next(req);
  }

  const token = sessionStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};