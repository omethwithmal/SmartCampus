package com.example.SmartCampus.controller;

import com.example.SmartCampus.dto.EquipmentDto;
import com.example.SmartCampus.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {

    @Autowired
    private EquipmentService equipmentService;

    // Helper method for error response
    private Map<String, String> createErrorResponse(String errorMessage) {
        Map<String, String> error = new HashMap<>();
        error.put("error", errorMessage);
        return error;
    }

    // Helper method for success response
    private Map<String, String> createSuccessResponse(String message) {
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return response;
    }

    // Create new equipment
    @PostMapping
    public ResponseEntity<?> createEquipment(@RequestBody EquipmentDto equipmentDto) {
        try {
            // Validate input
            if (equipmentDto.getName() == null || equipmentDto.getName().trim().isEmpty()) {
                return new ResponseEntity<>(createErrorResponse("Equipment name is required"), HttpStatus.BAD_REQUEST);
            }
            EquipmentDto created = equipmentService.createEquipment(equipmentDto);
            return new ResponseEntity<>(created, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(createErrorResponse(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get all equipment
    @GetMapping
    public ResponseEntity<List<EquipmentDto>> getAllEquipment() {
        List<EquipmentDto> equipment = equipmentService.getAllEquipment();
        return ResponseEntity.ok(equipment);
    }

    // Get equipment by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getEquipmentById(@PathVariable Integer id) {
        EquipmentDto equipment = equipmentService.getEquipmentById(id);
        if (equipment != null) {
            return ResponseEntity.ok(equipment);
        }
        return new ResponseEntity<>(createErrorResponse("Equipment not found with id: " + id), HttpStatus.NOT_FOUND);
    }

    // Update equipment
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEquipment(@PathVariable Integer id, @RequestBody EquipmentDto equipmentDto) {
        EquipmentDto updated = equipmentService.updateEquipment(id, equipmentDto);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return new ResponseEntity<>(createErrorResponse("Equipment not found with id: " + id), HttpStatus.NOT_FOUND);
    }

    // Delete equipment
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEquipment(@PathVariable Integer id) {
        boolean deleted = equipmentService.deleteEquipment(id);
        if (deleted) {
            return ResponseEntity.ok(createSuccessResponse("Equipment deleted successfully"));
        }
        return new ResponseEntity<>(createErrorResponse("Equipment not found with id: " + id), HttpStatus.NOT_FOUND);
    }

    // Search equipment
    @GetMapping("/search")
    public ResponseEntity<List<EquipmentDto>> searchEquipment(@RequestParam String q) {
        List<EquipmentDto> equipment = equipmentService.searchEquipment(q);
        return ResponseEntity.ok(equipment);
    }

    // Filter by category - FIXED method name
    @GetMapping("/category/{category}")
    public ResponseEntity<List<EquipmentDto>> getByCategory(@PathVariable String category) {
        List<EquipmentDto> equipment = equipmentService.getEquipmentByCategory(category);
        return ResponseEntity.ok(equipment);
    }

    // Filter by status - FIXED method name
    @GetMapping("/status/{status}")
    public ResponseEntity<List<EquipmentDto>> getByStatus(@PathVariable String status) {
        List<EquipmentDto> equipment = equipmentService.getEquipmentByStatus(status);
        return ResponseEntity.ok(equipment);
    }

    // Get available equipment
    @GetMapping("/available")
    public ResponseEntity<List<EquipmentDto>> getAvailableEquipment() {
        List<EquipmentDto> equipment = equipmentService.getAvailableEquipment();
        return ResponseEntity.ok(equipment);
    }

    // Get recent equipment
    @GetMapping("/recent")
    public ResponseEntity<List<EquipmentDto>> getRecentEquipment(@RequestParam(defaultValue = "30") int days) {
        List<EquipmentDto> equipment = equipmentService.getRecentEquipment(days);
        return ResponseEntity.ok(equipment);
    }

    // Get by category and status - FIXED method
    @GetMapping("/filter")
    public ResponseEntity<List<EquipmentDto>> filterEquipment(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status) {

        List<EquipmentDto> equipment;

        if (category != null && status != null) {
            // Both filters - FIXED method name
            equipment = equipmentService.getEquipmentByCategoryAndStatus(category, status);
        } else if (category != null) {
            // Only category - FIXED method name
            equipment = equipmentService.getEquipmentByCategory(category);
        } else if (status != null) {
            // Only status - FIXED method name
            equipment = equipmentService.getEquipmentByStatus(status);
        } else {
            // No filters
            equipment = equipmentService.getAllEquipment();
        }

        return ResponseEntity.ok(equipment);
    }

    // Get statistics
    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        Map<String, Object> stats = equipmentService.getStatistics();
        return ResponseEntity.ok(stats);
    }

    // Bulk delete
    @DeleteMapping("/bulk")
    public ResponseEntity<?> deleteMultipleEquipment(@RequestBody List<Integer> ids) {
        int deletedCount = equipmentService.bulkDeleteEquipment(ids);
        Map<String, Object> response = new HashMap<>();
        response.put("message", deletedCount + " equipment items deleted successfully");
        response.put("deletedCount", deletedCount);
        return ResponseEntity.ok(response);
    }

    // Update status only (for quick booking)
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateEquipmentStatus(@PathVariable Integer id, @RequestParam String status) {
        EquipmentDto updated = equipmentService.updateEquipmentStatus(id, status);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return new ResponseEntity<>(createErrorResponse("Equipment not found with id: " + id), HttpStatus.NOT_FOUND);
    }

    // Advanced filter with search
    @GetMapping("/advanced-filter")
    public ResponseEntity<Map<String, Object>> advancedFilter(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search) {

        Map<String, Object> result = equipmentService.getFilteredEquipment(category, status, search);
        return ResponseEntity.ok(result);
    }

    // Get equipment by multiple categories
    @GetMapping("/categories")
    public ResponseEntity<List<EquipmentDto>> getEquipmentByCategories(@RequestParam List<String> categories) {
        List<EquipmentDto> equipment = equipmentService.getEquipmentByCategories(categories);
        return ResponseEntity.ok(equipment);
    }
}