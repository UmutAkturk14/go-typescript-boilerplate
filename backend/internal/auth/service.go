package auth

import (
	"go-api-starter/internal/db"
	"go-api-starter/internal/models"

	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(email, password string) (models.User, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return models.User{}, err
	}

	user := models.User{
		Email:    email,
		Password: string(hashedPassword),
	}

	err = db.DB.Create(&user).Error
	return user, err
}

func AuthenticateUser(email, password string) (models.User, error) {
	var user models.User
	err := db.DB.Where("email = ?", email).First(&user).Error
	if err != nil {
		return user, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	return user, err
}
