"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
(0, utils_1.loadEnv)(process.env.NODE_ENV || 'development', process.cwd());
module.exports = (0, utils_1.defineConfig)({
    projectConfig: {
        databaseUrl: process.env.DATABASE_URL,
        redisUrl: process.env.REDIS_URL,
        http: {
            storeCors: process.env.STORE_CORS,
            adminCors: process.env.ADMIN_CORS,
            authCors: process.env.AUTH_CORS,
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
        backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
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
            };
        },
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBaUU7QUFFakUsSUFBQSxlQUFPLEVBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0FBRTdELE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBQSxvQkFBWSxFQUFDO0lBQzVCLGFBQWEsRUFBRTtRQUNiLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVk7UUFDckMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUztRQUMvQixJQUFJLEVBQUU7WUFDSixTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFXO1lBQ2xDLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVc7WUFDbEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBVTtZQUNoQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksYUFBYTtZQUNsRCxZQUFZLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLElBQUksYUFBYTtTQUN6RDtRQUNELHFCQUFxQixFQUFFO1lBQ3JCLEdBQUcsRUFBRSxLQUFLO1lBQ1YsT0FBTyxFQUFFLFNBQVM7U0FDbkI7S0FDRjtJQUVELEtBQUssRUFBRTtRQUNMLG9FQUFvRTtRQUNwRSxVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsSUFBSSx1QkFBdUI7UUFDckUsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDZixPQUFPO2dCQUNMLEdBQUcsTUFBTTtnQkFDVCxNQUFNLEVBQUU7b0JBQ04sSUFBSSxFQUFFLFNBQVM7b0JBQ2YsWUFBWSxFQUFFLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUM7b0JBQ3RELEdBQUcsRUFBRTt3QkFDSCxJQUFJLEVBQUUsSUFBSTt3QkFDVixVQUFVLEVBQUUsSUFBSTtxQkFDakI7aUJBQ0Y7YUFDRixDQUFBO1FBQ0gsQ0FBQztLQUNGO0NBRUYsQ0FBQyxDQUFBIn0=