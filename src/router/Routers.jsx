import PreLoader from '@/components/loader/PreLoader';
import { Suspense, useEffect, useState } from 'react';
import { Routes, Route, useRouteError } from 'react-router-dom';
import { PublicRoutes } from './PublicRoutes';
import { Layout, UserLayout } from '@/components/layouts';
import Cookies from 'js-cookie';
import { AdminRoutes } from './AdminRoutes';
import NotFound from '@/components/notfound/NotFound';
import { accessTokenCookieName, roleCookieName } from '@/lib/constants';
import { MerchantRoutes } from './MerchantRoutes';

export default function Routers() {
  const [isAuth, setIsAuth] = useState(false);
  const Role = Cookies.get(roleCookieName);
  useEffect(() => {
    const token = Cookies.get(accessTokenCookieName);
    if (token) {
      setIsAuth(true);
    }

    if (!token) {
      setIsAuth(false);
    }
  }, []);

  return (
    <Suspense fallback={<PreLoader />}>
      <Routes>
        {isAuth ? (
          Role === 'ADMIN' ? (
            <Route element={<Layout />} errorElement={<ErrorBoundary />}>
              <Route index path="/*" element={<NotFound />} />
              {AdminRoutes.map(route => (
                <Route key={route.path} {...route} />
              ))}
            </Route>
          ) : (
            <>
              <Route element={<UserLayout />} errorElement={<ErrorBoundary />}>
                <Route index path="/*" element={<NotFound />} />
                {MerchantRoutes.map(route => (
                  <Route key={route.path} {...route} />
                ))}
              </Route>
            </>
          )
        ) : (
          <>
            <Route element={<UserLayout />} errorElement={<ErrorBoundary />}>
              {PublicRoutes.map(route => (
                <Route key={route.path} {...route} />
              ))}
            </Route>
          </>
        )}
      </Routes>
    </Suspense>
  );
}
function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}
