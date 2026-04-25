package com.example.SmartCampus.service;

import com.example.SmartCampus.dto.EquipmentDto;
import com.example.SmartCampus.entity.EquipmentEntity;
import com.example.SmartCampus.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    // Convert Entity to DTO
    private EquipmentDto convertToDto(EquipmentEntity entity) {
        if (entity == null) return null;

        EquipmentDto dto = new EquipmentDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setCategory(entity.getCategory());
        dto.setStatus(entity.getStatus());
        dto.setImage(entity.getImage());
        dto.setDescription(entity.getDescription());
        dto.setAddedDate(entity.getAddedDate());
        dto.setLastUpdated(entity.getLastUpdated());

        return dto;
    }

    // Convert DTO to Entity
    private EquipmentEntity convertToEntity(EquipmentDto dto) {
        if (dto == null) return null;

        EquipmentEntity entity = new EquipmentEntity();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setCategory(dto.getCategory());
        entity.setStatus(dto.getStatus());
        entity.setImage(dto.getImage());
        entity.setDescription(dto.getDescription());
        entity.setAddedDate(dto.getAddedDate());
        entity.setLastUpdated(dto.getLastUpdated());

        return entity;
    }

    // Generate next ID (starting from 1)
    private Integer generateNextId() {
        List<EquipmentEntity> allEquipment = equipmentRepository.findAll();
        if (allEquipment.isEmpty()) return 1;
        return allEquipment.stream()
                .mapToInt(EquipmentEntity::getId)
                .max()
                .orElse(1) + 1;
    }

    // Create new equipment
    public EquipmentDto createEquipment(EquipmentDto equipmentDto) {
        Integer newId = generateNextId();
        equipmentDto.setId(newId);

        Date now = new Date();
        equipmentDto.setAddedDate(now);
        equipmentDto.setLastUpdated(now);

        if (equipmentDto.getStatus() == null || equipmentDto.getStatus().isEmpty()) {
            equipmentDto.setStatus("AVAILABLE");
        }

        if (equipmentDto.getCategory() == null || equipmentDto.getCategory().isEmpty()) {
            equipmentDto.setCategory("Projector");
        }

        EquipmentEntity entity = convertToEntity(equipmentDto);
        EquipmentEntity savedEntity = equipmentRepository.save(entity);
        return convertToDto(savedEntity);
    }

    // Get all equipment (sorted by name)
    public List<EquipmentDto> getAllEquipment() {
        return equipmentRepository.findAllByOrderByNameAsc().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get equipment by ID
    public EquipmentDto getEquipmentById(Integer id) {
        Optional<EquipmentEntity> equipment = equipmentRepository.findById(id);
        return equipment.map(this::convertToDto).orElse(null);
    }

    // Update equipment
    public EquipmentDto updateEquipment(Integer id, EquipmentDto equipmentDto) {
        if (!equipmentRepository.existsById(id)) {
            return null;
        }

        Optional<EquipmentEntity> existingOpt = equipmentRepository.findById(id);
        if (existingOpt.isPresent()) {
            EquipmentEntity existing = existingOpt.get();

            equipmentDto.setId(id);
            equipmentDto.setAddedDate(existing.getAddedDate());
            equipmentDto.setLastUpdated(new Date());

            EquipmentEntity entity = convertToEntity(equipmentDto);
            EquipmentEntity updatedEntity = equipmentRepository.save(entity);
            return convertToDto(updatedEntity);
        }

        return null;
    }

    // Delete equipment
    public boolean deleteEquipment(Integer id) {
        if (equipmentRepository.existsById(id)) {
            equipmentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Search equipment by name or description
    public List<EquipmentDto> searchEquipment(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllEquipment();
        }
        return equipmentRepository.searchByNameOrDescription(searchTerm).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get equipment by category
    public List<EquipmentDto> getEquipmentByCategory(String category) {
        return equipmentRepository.findByCategory(category).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get equipment by status
    public List<EquipmentDto> getEquipmentByStatus(String status) {
        return equipmentRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get available equipment
    public List<EquipmentDto> getAvailableEquipment() {
        return equipmentRepository.findAvailableEquipment().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get equipment by category and status
    public List<EquipmentDto> getEquipmentByCategoryAndStatus(String category, String status) {
        return equipmentRepository.findByCategoryAndStatus(category, status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get recent equipment (last N days) - FIXED version
    public List<EquipmentDto> getRecentEquipment(int days) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_MONTH, -days);
        Date fromDate = calendar.getTime();

        // Use the fixed method name
        List<EquipmentEntity> recentEntities = equipmentRepository.findByAddedDateGreaterThanEqual(fromDate);

        // Alternative way if the above doesn't work (fallback)
        if (recentEntities == null || recentEntities.isEmpty()) {
            // Fallback to manual filtering (Java 8 compatible)
            List<EquipmentEntity> allEntities = equipmentRepository.findAll();
            recentEntities = allEntities.stream()
                    .filter(e -> e.getAddedDate() != null && e.getAddedDate().after(fromDate))
                    .collect(Collectors.toList());
        }

        return recentEntities.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get statistics
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        List<EquipmentEntity> allEquipment = equipmentRepository.findAll();

        long total = allEquipment.size();
        long available = equipmentRepository.countByStatus("AVAILABLE");
        long booked = equipmentRepository.countByStatus("Booked");

        stats.put("totalEquipment", total);
        stats.put("availableEquipment", available);
        stats.put("bookedEquipment", booked);

        if (total > 0) {
            stats.put("availablePercentage", (available * 100.0) / total);
            stats.put("bookedPercentage", (booked * 100.0) / total);
        } else {
            stats.put("availablePercentage", 0);
            stats.put("bookedPercentage", 0);
        }

        Map<String, Long> categoryDistribution = new HashMap<>();
        categoryDistribution.put("Projector", equipmentRepository.countByCategory("Projector"));
        categoryDistribution.put("Camera", equipmentRepository.countByCategory("Camera"));
        categoryDistribution.put("Microphone", equipmentRepository.countByCategory("Microphone"));
        categoryDistribution.put("Laptop", equipmentRepository.countByCategory("Laptop"));
        categoryDistribution.put("Speaker", equipmentRepository.countByCategory("Speaker"));
        stats.put("categoryDistribution", categoryDistribution);

        Map<String, Double> categoryPercentages = new HashMap<>();
        for (Map.Entry<String, Long> entry : categoryDistribution.entrySet()) {
            categoryPercentages.put(entry.getKey(), total > 0 ? (entry.getValue() * 100.0) / total : 0);
        }
        stats.put("categoryPercentages", categoryPercentages);

        Map<String, Long> statusDistribution = new HashMap<>();
        statusDistribution.put("AVAILABLE", available);
        statusDistribution.put("Booked", booked);
        stats.put("statusDistribution", statusDistribution);

        // Recent additions using the fixed method
        Calendar thirtyDaysAgo = Calendar.getInstance();
        thirtyDaysAgo.add(Calendar.DAY_OF_MONTH, -30);
        long recentAdditions = allEquipment.stream()
                .filter(e -> e.getAddedDate() != null && e.getAddedDate().after(thirtyDaysAgo.getTime()))
                .count();
        stats.put("recentAdditionsLast30Days", recentAdditions);

        long withoutImages = allEquipment.stream()
                .filter(e -> e.getImage() == null || e.getImage().isEmpty())
                .count();
        stats.put("equipmentWithoutImages", withoutImages);

        return stats;
    }

    // Bulk delete equipment
    public int bulkDeleteEquipment(List<Integer> ids) {
        int deletedCount = 0;
        for (Integer id : ids) {
            if (equipmentRepository.existsById(id)) {
                equipmentRepository.deleteById(id);
                deletedCount++;
            }
        }
        return deletedCount;
    }

    // Update status only
    public EquipmentDto updateEquipmentStatus(Integer id, String status) {
        Optional<EquipmentEntity> equipmentOpt = equipmentRepository.findById(id);
        if (equipmentOpt.isPresent()) {
            EquipmentEntity equipment = equipmentOpt.get();
            equipment.setStatus(status);
            equipment.setLastUpdated(new Date());
            EquipmentEntity updated = equipmentRepository.save(equipment);
            return convertToDto(updated);
        }
        return null;
    }

    // Get equipment by multiple categories
    public List<EquipmentDto> getEquipmentByCategories(List<String> categories) {
        return equipmentRepository.findAll().stream()
                .filter(e -> categories.contains(e.getCategory()))
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Advanced filtering
    public Map<String, Object> getFilteredEquipment(String category, String status, String search) {
        Map<String, Object> result = new HashMap<>();
        List<EquipmentDto> filteredList = getAllEquipment();

        if (category != null && !category.isEmpty()) {
            filteredList = filteredList.stream()
                    .filter(e -> e.getCategory().equalsIgnoreCase(category))
                    .collect(Collectors.toList());
        }

        if (status != null && !status.isEmpty()) {
            filteredList = filteredList.stream()
                    .filter(e -> e.getStatus().equalsIgnoreCase(status))
                    .collect(Collectors.toList());
        }

        if (search != null && !search.isEmpty()) {
            filteredList = filteredList.stream()
                    .filter(e -> e.getName().toLowerCase().contains(search.toLowerCase()) ||
                            (e.getDescription() != null && e.getDescription().toLowerCase().contains(search.toLowerCase())))
                    .collect(Collectors.toList());
        }

        result.put("equipment", filteredList);
        result.put("total", filteredList.size());

        Map<String, String> filters = new HashMap<>();
        filters.put("category", category);
        filters.put("status", status);
        filters.put("search", search);
        result.put("filters", filters);

        return result;
    }
}