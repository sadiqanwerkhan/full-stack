package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"backend/db"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, `{"message":"Hello from Go backend!"}`)
}

func createMessageHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Content-Type", "application/json")

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	type Message struct {
		Content string `json:"content"`
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
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Content-Type", "application/json")

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

	type Message struct {
		ID      int    `json:"id"`
		Content string `json:"content"`
	}

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


func main() {
	// Connect to PostgreSQL
	db.Init()

	http.HandleFunc("/api/hello", helloHandler)
	
	http.HandleFunc("/api/messages", func(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		createMessageHandler(w, r)
	} else if r.Method == http.MethodGet {
		getMessagesHandler(w, r)
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
})



	port := ":8080"
	fmt.Println("🚀 Backend running at http://localhost" + port)
	log.Fatal(http.ListenAndServe(port, nil))
}
