package test

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func PublicTestHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "This is a public test route. No auth required.",
	})
}

func ProtectedTestHandler(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "userID not found in context"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "This is a protected test route. Auth successful.",
		"userID":  userID,
	})
}
