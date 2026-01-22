import type { RouteObject } from 'react-router-dom';
import { Suspense, lazy, type ReactNode } from 'react';
import { transformPagePath } from '@/libs/react-router/transformers/page';
import { getDirectoryPath } from '@/libs/react-router/utils/route';

type FileGlob = Record<string, () => Promise<any>>;

interface RouteMap {
  [path: string]: RouteObject;
}

/**
 * Create lazy component wrapper with Suspense
 */
function createLazyComponent(importFn: () => Promise<any>, fallback: ReactNode = <div>Loading...</div>) {
  const LazyComponent = lazy(async () => {
    const module = await importFn();
    return { default: module.default || (() => null) };
  });
  
  return (
    <Suspense fallback={fallback}>
      <LazyComponent />
    </Suspense>
  );
}

/**
 * Create routes from file globs
 */
export function createRoutesFromFiles(
  pageFiles: FileGlob,
  errorFiles: FileGlob = {},
  notFoundFiles: FileGlob = {},
  loadingFiles: FileGlob = {}
): RouteObject {
  const routeMap: RouteMap = {};
  
  // Find root layout
  const rootLayoutPath = './app/layout.tsx';
  const rootLayout = pageFiles[rootLayoutPath];
  
  // Process all page files
  Object.keys(pageFiles).forEach((filePath) => {
    if (filePath.includes('/layout.tsx')) return; // Skip layouts for now
    if (!filePath.includes('/page.tsx')) return; // Only process page files
    
    const routePath = transformPagePath(filePath);
    const dir = getDirectoryPath(filePath);
    
    // Find corresponding error and loading files
    const errorPath = `${dir}/error.tsx`;
    const loadingPath = `${dir}/loading.tsx`;
    
    const errorFile = errorFiles[errorPath];
    const loadingFile = loadingFiles[loadingPath];
    
    // Create fallback element - lazy load custom loading component if exists
    const fallback = loadingFile ? createLazyComponent(loadingFile) : <div>Loading...</div>;
    
    // Create route object
    const route: RouteObject = {
      path: routePath === '/' ? '/' : routePath.replace(/^\//,''),
      element: createLazyComponent(pageFiles[filePath], fallback),
    };
    
    if (errorFile) {
      route.errorElement = createLazyComponent(errorFile);
    }
    
    routeMap[routePath] = route;
  });
  
  // Convert route map to array
  const routes = Object.values(routeMap);
  
  // Create root route with layout
  const rootRoute: RouteObject = {
    path: '/',
    element: rootLayout ? createLazyComponent(rootLayout) : null,
    children: routes,
  };
  
  // Add global 404 handler
  const globalNotFound = notFoundFiles['./app/404.tsx'];
  if (globalNotFound) {
    rootRoute.children?.push({
      path: '*',
      element: createLazyComponent(globalNotFound),
    });
  }
  
  return rootRoute;
}

// Export all utilities
export * from '@/libs/react-router/utils/route';
export * from '@/libs/react-router/utils/path';
export * from '@/libs/react-router/transformers/page';
