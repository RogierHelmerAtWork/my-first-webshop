import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const domain = process.env.RAILWAY_PUBLIC_DOMAIN
const backendUrl = domain ? `https://${domain}` : "http://localhost:9000"

console.log("RAILWAY_PUBLIC_DOMAIN:", process.env.RAILWAY_PUBLIC_DOMAIN)
console.log("backendUrl:", backendUrl)

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS || backendUrl,
      adminCors: process.env.ADMIN_CORS || backendUrl,
      authCors: process.env.AUTH_CORS || backendUrl,

      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    databaseDriverOptions: {
      ssl: false,
      sslmode: "disable",
    },
  },

  admin: {
    // optional but recommended when running in Docker / separate origin
    backendUrl,
    vite: (config) => {
      return {
        ...config,
        server: {
          host: "0.0.0.0",
          allowedHosts: ["localhost", ".localhost", "127.0.0.1"],
          hmr: {
            port: 5173,
            clientPort: 5173,
          },
        },
      }
    },
  },

})
