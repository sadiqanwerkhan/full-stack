package main

import (
	"fmt"
	"log"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, `{"message":"Hello from Go backend!"}`)
}

func main() {
	http.HandleFunc("/api/hello", helloHandler)

	port := ":8080"
	fmt.Println("🚀 Backend running at http://localhost" + port)
	log.Fatal(http.ListenAndServe(port, nil))
}
