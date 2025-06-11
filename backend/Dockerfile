# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Install git (for go modules if private repos involved)
RUN apk add --no-cache git

# Copy and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of code
COPY . .

# Build the Go app
RUN go build -o server

# Run stage (lightweight image)
FROM alpine:latest

WORKDIR /root/

# Copy binary from builder
COPY --from=builder /app/server .

# Expose backend port
EXPOSE 8080

# Start the app
CMD ["./server"]
