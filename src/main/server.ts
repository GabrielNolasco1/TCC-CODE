import "reflect-metadata";
import { AppDataSource } from "@/infrastructure/database/typeorm/data-source";
import { app } from "@/infrastructure/http/app"; 

const PORT = process.env.PORT || 3000;

async function bootstrap() {
    try {
        await AppDataSource.initialize();
        
        console.log("Database connected with TypeORM!");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
            console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
        });
        
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); 
    }
}

bootstrap();