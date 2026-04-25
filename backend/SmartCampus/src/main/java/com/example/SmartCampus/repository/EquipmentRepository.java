package com.example.SmartCampus.repository;

import com.example.SmartCampus.entity.EquipmentEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;

@Repository
public interface EquipmentRepository extends MongoRepository<EquipmentEntity, Integer> {

    // Find by name (case-insensitive)
    @Query("{ 'name': { $regex: ?0, $options: 'i' } }")
    List<EquipmentEntity> findByNameContainingIgnoreCase(String name);

    // Find by category
    List<EquipmentEntity> findByCategory(String category);

    // Find by status
    List<EquipmentEntity> findByStatus(String status);

    // Find by category and status
    List<EquipmentEntity> findByCategoryAndStatus(String category, String status);

    // Search by name or description
    @Query("{ $or: [ { 'name': { $regex: ?0, $options: 'i' } }, { 'description': { $regex: ?0, $options: 'i' } } ] }")
    List<EquipmentEntity> searchByNameOrDescription(String searchTerm);

    // Find available equipment
    @Query("{ 'status': 'AVAILABLE' }")
    List<EquipmentEntity> findAvailableEquipment();

    // Find by status and category
    @Query("{ 'status': ?0, 'category': ?1 }")
    List<EquipmentEntity> findByStatusAndCategory(String status, String category);

    // Count by status
    @Query(value = "{ 'status': ?0 }", count = true)
    long countByStatus(String status);

    // Count by category
    @Query(value = "{ 'category': ?0 }", count = true)
    long countByCategory(String category);

    // Get all equipment ordered by name
    List<EquipmentEntity> findAllByOrderByNameAsc();

    // Get recent equipment - FIXED version (Java 8 compatible)
    @Query("{ 'addedDate': { $gte: ?0 } }")
    List<EquipmentEntity> findByAddedDateGreaterThanEqual(Date fromDate);
}