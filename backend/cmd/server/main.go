package main

import (
	"log"
	"os"
	"time"

	"go-api-starter/internal/db"
	"go-api-starter/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	db.Connect()
	db.DB.AutoMigrate()

	r := gin.Default()

	// Get frontend origin from env
	frontendOrigin := os.Getenv("FRONTEND_ORIGIN")
	if frontendOrigin == "" {
		log.Fatal("FRONTEND_ORIGIN not set in .env")
	}

	// Use CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{frontendOrigin},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Register all routes
	routes.RegisterAll(r)

	// Run server
	r.Run()
}
