package auth

type LoginRequest struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type RegisterRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=8"`
}

type LoginResponse struct {
	Message string `json:"message"`
	Token   string `json:"token"`
}

type RegisterResponse struct {
	Message string `json:"message"`
	Token   string `json:"token"`
}
