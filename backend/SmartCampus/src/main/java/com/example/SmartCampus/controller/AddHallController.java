// AddHallController.java (Java 8 compatible)
package com.example.SmartCampus.controller;

import com.example.SmartCampus.dto.AddHallDto;
import com.example.SmartCampus.service.AddHallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/halls")
public class AddHallController {

    @Autowired
    private AddHallService addHallService;

    // Helper method to create error response
    private Map<String, String> createErrorResponse(String errorMessage) {
        Map<String, String> error = new HashMap<>();
        error.put("error", errorMessage);
        return error;
    }

    // Helper method to create success response
    private Map<String, String> createSuccessResponse(String message) {
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return response;
    }

    // Create new hall
    @PostMapping
    public ResponseEntity<?> createHall(@RequestBody AddHallDto hallDto) {
        try {
            AddHallDto createdHall = addHallService.createHall(hallDto);
            return new ResponseEntity<>(createdHall, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(createErrorResponse(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get all halls
    @GetMapping
    public ResponseEntity<List<AddHallDto>> getAllHalls() {
        List<AddHallDto> halls = addHallService.getAllHalls();
        return ResponseEntity.ok(halls);
    }

    // Get hall by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getHallById(@PathVariable Integer id) {
        AddHallDto hall = addHallService.getHallById(id);
        if (hall != null) {
            return ResponseEntity.ok(hall);
        }
        return new ResponseEntity<>(createErrorResponse("Hall not found with id: " + id), HttpStatus.NOT_FOUND);
    }

    // Update hall
    @PutMapping("/{id}")
    public ResponseEntity<?> updateHall(@PathVariable Integer id, @RequestBody AddHallDto hallDto) {
        AddHallDto updatedHall = addHallService.updateHall(id, hallDto);
        if (updatedHall != null) {
            return ResponseEntity.ok(updatedHall);
        }
        return new ResponseEntity<>(createErrorResponse("Hall not found with id: " + id), HttpStatus.NOT_FOUND);
    }

    // Delete hall
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHall(@PathVariable Integer id) {
        boolean deleted = addHallService.deleteHall(id);
        if (deleted) {
            return ResponseEntity.ok(createSuccessResponse("Hall deleted successfully"));
        }
        return new ResponseEntity<>(createErrorResponse("Hall not found with id: " + id), HttpStatus.NOT_FOUND);
    }

    // Search halls by name or location
    @GetMapping("/search")
    public ResponseEntity<List<AddHallDto>> searchHalls(@RequestParam String q) {
        List<AddHallDto> halls = addHallService.searchHalls(q);
        return ResponseEntity.ok(halls);
    }

    // Filter by type
    @GetMapping("/type/{type}")
    public ResponseEntity<List<AddHallDto>> getHallsByType(@PathVariable String type) {
        List<AddHallDto> halls = addHallService.getHallsByType(type);
        return ResponseEntity.ok(halls);
    }

    // Filter by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<AddHallDto>> getHallsByStatus(@PathVariable String status) {
        List<AddHallDto> halls = addHallService.getHallsByStatus(status);
        return ResponseEntity.ok(halls);
    }

    // Filter by capacity
    @GetMapping("/capacity/{capacity}")
    public ResponseEntity<List<AddHallDto>> getHallsByCapacity(@PathVariable String capacity) {
        List<AddHallDto> halls = addHallService.getHallsByCapacity(capacity);
        return ResponseEntity.ok(halls);
    }

    // Get available rooms
    @GetMapping("/available")
    public ResponseEntity<List<AddHallDto>> getAvailableRooms() {
        List<AddHallDto> halls = addHallService.getAvailableRooms();
        return ResponseEntity.ok(halls);
    }

    // Filter by facility
    @GetMapping("/facility/{facility}")
    public ResponseEntity<List<AddHallDto>> getHallsByFacility(@PathVariable String facility) {
        List<AddHallDto> halls = addHallService.getHallsByFacility(facility);
        return ResponseEntity.ok(halls);
    }

    // Get top used halls
    @GetMapping("/top-used")
    public ResponseEntity<List<AddHallDto>> getTopUsedHalls() {
        List<AddHallDto> halls = addHallService.getTopUsedHalls();
        return ResponseEntity.ok(halls);
    }

    // Get statistics
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        Map<String, Object> stats = addHallService.getStatistics();
        return ResponseEntity.ok(stats);
    }

    // Increment usage count
    @PostMapping("/{id}/increment-usage")
    public ResponseEntity<?> incrementUsageCount(@PathVariable Integer id) {
        AddHallDto updatedHall = addHallService.incrementUsageCount(id);
        if (updatedHall != null) {
            return ResponseEntity.ok(updatedHall);
        }
        return new ResponseEntity<>(createErrorResponse("Hall not found with id: " + id), HttpStatus.NOT_FOUND);
    }

    // Combined filter endpoint
    @GetMapping("/filter")
    public ResponseEntity<List<AddHallDto>> filterHalls(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String capacity,
            @RequestParam(required = false) String search) {

        List<AddHallDto> result = addHallService.getAllHalls();

        if (search != null && !search.isEmpty()) {
            result = addHallService.searchHalls(search);
        }

        if (type != null && !type.isEmpty()) {
            result.retainAll(addHallService.getHallsByType(type));
        }

        if (status != null && !status.isEmpty()) {
            result.retainAll(addHallService.getHallsByStatus(status));
        }

        if (capacity != null && !capacity.isEmpty()) {
            result.retainAll(addHallService.getHallsByCapacity(capacity));
        }

        return ResponseEntity.ok(result);
    }
}