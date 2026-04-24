// AddHallRepository.java
package com.example.SmartCampus.repository;

import com.example.SmartCampus.entity.AddHallEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AddHallRepository extends MongoRepository<AddHallEntity, Integer> {

    // Find by name (case-insensitive)
    @Query("{ 'name': { $regex: ?0, $options: 'i' } }")
    List<AddHallEntity> findByNameContainingIgnoreCase(String name);

    // Find by location (case-insensitive)
    @Query("{ 'location': { $regex: ?0, $options: 'i' } }")
    List<AddHallEntity> findByLocationContainingIgnoreCase(String location);

    // Find by type
    List<AddHallEntity> findByType(String type);

    // Find by status
    List<AddHallEntity> findByStatus(String status);

    // Find by capacity
    List<AddHallEntity> findByCapacity(String capacity);

    // Find by type and status
    List<AddHallEntity> findByTypeAndStatus(String type, String status);

    // Search by name or location (custom query)
    @Query("{ $or: [ { 'name': { $regex: ?0, $options: 'i' } }, { 'location': { $regex: ?0, $options: 'i' } } ] }")
    List<AddHallEntity> searchByNameOrLocation(String searchTerm);

    // Get available rooms
    @Query("{ 'status': 'available' }")
    List<AddHallEntity> findAvailableRooms();

    // Get rooms by facility
    @Query("{ 'facilities.?0': true }")
    List<AddHallEntity> findByFacility(String facilityName);

    // Get rooms with usage count greater than
    @Query("{ 'usageCount': { $gt: ?0 } }")
    List<AddHallEntity> findByUsageCountGreaterThan(Integer count);

    // Find top used rooms (sorted by usageCount descending)
    List<AddHallEntity> findAllByOrderByUsageCountDesc();

    // Count by status
    @Query(value = "{ 'status': ?0 }", count = true)
    long countByStatus(String status);

    // Count by type
    @Query(value = "{ 'type': ?0 }", count = true)
    long countByType(String type);
}