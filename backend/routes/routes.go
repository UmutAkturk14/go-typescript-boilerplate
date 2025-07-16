package routes

import (
	"go-api-starter/internal/auth"
	"go-api-starter/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterAll(r *gin.Engine) {
	v1 := r.Group("/api/v1")

	// Public routes
	auth.RegisterRoutes(v1)

	// Protected routes
	protected := v1.Group("/")
	protected.Use(middleware.JWTAuthMiddleware())

	// TODO: Add protected routes here, e.g.
	// protected.GET("/profile", user.ProfileHandler)
}
