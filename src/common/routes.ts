type Query = { [key: string]: string | number }

type ExtractParams<T extends string> = T extends `${string}[${infer Param}]${infer Rest}`
  ? { [K in Param]: string } & ExtractParams<Rest>
  : // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    {}

type RouteConfig<T extends string> = {
  path: T
  params?: ExtractParams<T>
  query?: Query
}

type RouterConfig = {
  [K: string]: string | RouteConfig<string>
}

type InferRouteConfig<T> =
  T extends RouteConfig<infer Path> ? RouteConfig<Path> : T extends string ? RouteConfig<T> : never

export type TypeSafeRoute<T extends RouterConfig> = {
  [K in keyof T]: InferRouteConfig<T[K]>
}

export function createRouter<T extends RouterConfig>(config: T) {
  return config
}

export function createUrl<T extends string, P extends ExtractParams<T>>(
  config: RouteConfig<T>,
  options: {
    params?: P
    query?: Query
  },
): string {
  let path = config.path

  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      path = path.replace(`[${key}]`, String(value)) as T
    })
  }

  if (options?.query) {
    const queryString = Object.entries(options.query)
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join('&')
    if (queryString) {
      path = `${path}?${queryString}` as T
    }
  }

  return path
}

export const appRouter = createRouter({
  home: '/',
  about: '/about',
  blogBySlug: {
    path: '/blogs/[slug]',
  },
  blogs: {
    path: '/blogs',
  },
})

export type AppRouter = typeof appRouter
