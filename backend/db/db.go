package db

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq" // PostgreSQL driver
)

var DB *sql.DB

func Init() {
	connStr := "host=localhost port=5432 user=user password=password dbname=app_db sslmode=disable"

	var err error
	DB, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("❌ Failed to connect to database:", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatal("❌ Cannot reach database:", err)
	}

	log.Println("✅ Connected to PostgreSQL!")
}
