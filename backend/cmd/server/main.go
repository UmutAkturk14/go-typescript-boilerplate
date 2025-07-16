package main

import (
	"go-api-starter/internal/db"
	"go-api-starter/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	db.Connect()
	db.DB.AutoMigrate()

	r := gin.Default()

	routes.RegisterAll(r)

	r.Run()
}
