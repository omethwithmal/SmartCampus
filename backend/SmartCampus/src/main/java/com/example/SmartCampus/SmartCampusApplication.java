package com.example.SmartCampus;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;

@SpringBootApplication
public class SmartCampusApplication {

	public static void main(String[] args) {
		SpringApplication.run(SmartCampusApplication.class, args);
	}

	@Bean
	public CommandLineRunner testMongoDBConnection(MongoTemplate mongoTemplate) {
		return args -> {
			try {
				String dbName = mongoTemplate.getDb().getName();
				System.out.println("========================================");
				System.out.println("✅ SUCCESS: Connected to MongoDB Atlas!");
				System.out.println("✅ Database: " + dbName);
				System.out.println("========================================");
			} catch (Exception e) {
				System.err.println("========================================");
				System.err.println("❌ ERROR: Cannot connect to MongoDB!");
				System.err.println("❌ Message: " + e.getMessage());
				System.err.println("========================================");
				System.err.println("💡 Tips:");
				System.err.println("   1. Check your internet connection");
				System.err.println("   2. Verify MongoDB Atlas credentials");
				System.err.println("   3. Check Network Access in MongoDB Atlas");
				System.err.println("========================================");
			}
		};
	}
}