package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"backend/db"
)

// Message struct
type Message struct {
	ID      int    `json:"id,omitempty"`
	Content string `json:"content"`
}

// Handlers

func helloHandler(w http.ResponseWriter, r *http.Request) {
	setHeaders(w)
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, `{"message":"Hello from Go backend!"}`)
}

func createMessageHandler(w http.ResponseWriter, r *http.Request) {
	setHeaders(w)

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var msg Message
	err := json.NewDecoder(r.Body).Decode(&msg)
	if err != nil || msg.Content == "" {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	_, err = db.DB.Exec("INSERT INTO messages (content) VALUES ($1)", msg.Content)
	if err != nil {
		http.Error(w, "Failed to insert message", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	fmt.Fprint(w, `{"status":"message inserted"}`)
}

func getMessagesHandler(w http.ResponseWriter, r *http.Request) {
	setHeaders(w)

	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	rows, err := db.DB.Query("SELECT id, content FROM messages ORDER BY id DESC")
	if err != nil {
		http.Error(w, "Failed to fetch messages", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var messages []Message
	for rows.Next() {
		var msg Message
		if err := rows.Scan(&msg.ID, &msg.Content); err != nil {
			http.Error(w, "Error scanning row", http.StatusInternalServerError)
			return
		}
		messages = append(messages, msg)
	}

	json.NewEncoder(w).Encode(messages)
}

func deleteMessageHandler(w http.ResponseWriter, r *http.Request) {
	setHeaders(w)

	if r.Method != http.MethodDelete {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Extract ID from URL
	idStr := r.URL.Path[len("/api/messages/"):]
	if idStr == "" {
		http.Error(w, "ID is required", http.StatusBadRequest)
		return
	}

	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid ID", http.StatusBadRequest)
		return
	}

	result, err := db.DB.Exec("DELETE FROM messages WHERE id = $1", id)
	if err != nil {
		http.Error(w, "Failed to delete message", http.StatusInternalServerError)
		return
	}

	rowsAffected, _ := result.RowsAffected()
	if rowsAffected == 0 {
		http.Error(w, "Message not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// CORS helper
func setHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "application/json")
}

func main() {
	// Connect to PostgreSQL
	db.Init()

	// Routes

	http.HandleFunc("/api/messages", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			setHeaders(w)
			w.WriteHeader(http.StatusOK)
			return
		}
		if r.Method == http.MethodPost {
			createMessageHandler(w, r)
		} else if r.Method == http.MethodGet {
			getMessagesHandler(w, r)
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	// DELETE route with ID param
	http.HandleFunc("/api/messages/", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodOptions {
			setHeaders(w)
			w.WriteHeader(http.StatusOK)
			return
		}
		if r.Method == http.MethodDelete {
			deleteMessageHandler(w, r)
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	port := ":8080"
	fmt.Println("🚀 Backend running at http://localhost" + port)
	log.Fatal(http.ListenAndServe(port, nil))
}
