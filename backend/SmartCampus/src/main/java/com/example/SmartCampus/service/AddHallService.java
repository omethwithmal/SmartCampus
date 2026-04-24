// AddHallService.java
package com.example.SmartCampus.service;

import com.example.SmartCampus.dto.AddHallDto;
import com.example.SmartCampus.entity.AddHallEntity;
import com.example.SmartCampus.repository.AddHallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AddHallService {

    @Autowired
    private AddHallRepository addHallRepository;

    // Convert Entity to DTO
    private AddHallDto convertToDto(AddHallEntity entity) {
        if (entity == null) return null;

        AddHallDto dto = new AddHallDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setType(entity.getType());
        dto.setCapacity(entity.getCapacity());
        dto.setLocation(entity.getLocation());
        dto.setStatus(entity.getStatus());
        dto.setCoverImage(entity.getCoverImage());
        dto.setDescription(entity.getDescription());
        dto.setFacilities(entity.getFacilities());
        dto.setUsageCount(entity.getUsageCount());
        dto.setWeeklyUsage(entity.getWeeklyUsage());

        // Convert TimeSlot entities to DTOs
        if (entity.getTimeSlots() != null) {
            List<AddHallDto.TimeSlotDto> timeSlotDtos = entity.getTimeSlots().stream()
                    .map(slot -> {
                        AddHallDto.TimeSlotDto dtoSlot = new AddHallDto.TimeSlotDto();
                        dtoSlot.setDay(slot.getDay());
                        dtoSlot.setSlots(slot.getSlots());
                        return dtoSlot;
                    })
                    .collect(Collectors.toList());
            dto.setTimeSlots(timeSlotDtos);
        }

        return dto;
    }

    // Convert DTO to Entity
    private AddHallEntity convertToEntity(AddHallDto dto) {
        if (dto == null) return null;

        AddHallEntity entity = new AddHallEntity();
        entity.setId(dto.getId());
        entity.setName(dto.getName());
        entity.setType(dto.getType());
        entity.setCapacity(dto.getCapacity());
        entity.setLocation(dto.getLocation());
        entity.setStatus(dto.getStatus());
        entity.setCoverImage(dto.getCoverImage());
        entity.setDescription(dto.getDescription());
        entity.setFacilities(dto.getFacilities());
        entity.setUsageCount(dto.getUsageCount());
        entity.setWeeklyUsage(dto.getWeeklyUsage());

        // Convert TimeSlot DTOs to Entities
        if (dto.getTimeSlots() != null) {
            List<AddHallEntity.TimeSlot> timeSlots = dto.getTimeSlots().stream()
                    .map(dtoSlot -> {
                        AddHallEntity.TimeSlot slot = new AddHallEntity.TimeSlot();
                        slot.setDay(dtoSlot.getDay());
                        slot.setSlots(dtoSlot.getSlots());
                        return slot;
                    })
                    .collect(Collectors.toList());
            entity.setTimeSlots(timeSlots);
        }

        return entity;
    }

    // Create new hall
    public AddHallDto createHall(AddHallDto hallDto) {
        Integer newId = generateNextId();
        hallDto.setId(newId);

        if (hallDto.getUsageCount() == null) hallDto.setUsageCount(0);
        if (hallDto.getWeeklyUsage() == null) {
            hallDto.setWeeklyUsage(Arrays.asList(0, 0, 0, 0, 0, 0, 0));
        }

        AddHallEntity entity = convertToEntity(hallDto);
        AddHallEntity savedEntity = addHallRepository.save(entity);
        return convertToDto(savedEntity);
    }

    // Generate next ID
    private Integer generateNextId() {
        List<AddHallEntity> allHalls = addHallRepository.findAll();
        if (allHalls.isEmpty()) return 10;
        return allHalls.stream()
                .mapToInt(AddHallEntity::getId)
                .max()
                .orElse(10) + 1;
    }

    // Get all halls
    public List<AddHallDto> getAllHalls() {
        return addHallRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get hall by ID
    public AddHallDto getHallById(Integer id) {
        Optional<AddHallEntity> hall = addHallRepository.findById(id);
        return hall.map(this::convertToDto).orElse(null);
    }

    // Update hall
    public AddHallDto updateHall(Integer id, AddHallDto hallDto) {
        if (!addHallRepository.existsById(id)) {
            return null;
        }
        hallDto.setId(id);
        AddHallEntity entity = convertToEntity(hallDto);
        AddHallEntity updatedEntity = addHallRepository.save(entity);
        return convertToDto(updatedEntity);
    }

    // Delete hall
    public boolean deleteHall(Integer id) {
        if (addHallRepository.existsById(id)) {
            addHallRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Search halls by name or location
    public List<AddHallDto> searchHalls(String searchTerm) {
        return addHallRepository.searchByNameOrLocation(searchTerm).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get halls by type
    public List<AddHallDto> getHallsByType(String type) {
        return addHallRepository.findByType(type).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get halls by status
    public List<AddHallDto> getHallsByStatus(String status) {
        return addHallRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get halls by capacity
    public List<AddHallDto> getHallsByCapacity(String capacity) {
        return addHallRepository.findByCapacity(capacity).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get available rooms
    public List<AddHallDto> getAvailableRooms() {
        return addHallRepository.findAvailableRooms().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get halls by facility
    public List<AddHallDto> getHallsByFacility(String facilityName) {
        return addHallRepository.findByFacility(facilityName).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get top used halls
    public List<AddHallDto> getTopUsedHalls() {
        return addHallRepository.findAllByOrderByUsageCountDesc().stream()
                .limit(10)
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get statistics
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        List<AddHallEntity> allHalls = addHallRepository.findAll();

        stats.put("totalRooms", allHalls.size());
        stats.put("availableRooms", addHallRepository.countByStatus("available"));
        stats.put("bookedRooms", addHallRepository.countByStatus("booked"));
        stats.put("maintenanceRooms", addHallRepository.countByStatus("maintenance"));

        Map<String, Long> typeStats = new HashMap<>();
        typeStats.put("lecture hall", addHallRepository.countByType("lecture hall"));
        typeStats.put("meeting room", addHallRepository.countByType("meeting room"));
        typeStats.put("seminar room", addHallRepository.countByType("seminar room"));
        typeStats.put("laboratory", addHallRepository.countByType("laboratory"));
        stats.put("typeDistribution", typeStats);

        Map<String, Long> capacityStats = new HashMap<>();
        capacityStats.put("small", addHallRepository.findByCapacity("small").stream().count());
        capacityStats.put("medium", addHallRepository.findByCapacity("medium").stream().count());
        capacityStats.put("large", addHallRepository.findByCapacity("large").stream().count());
        stats.put("capacityDistribution", capacityStats);

        Integer totalUsage = allHalls.stream()
                .mapToInt(h -> h.getUsageCount() != null ? h.getUsageCount() : 0)
                .sum();
        stats.put("totalUsage", totalUsage);

        if (allHalls.size() > 0) {
            stats.put("avgUsagePerRoom", totalUsage / allHalls.size());
        } else {
            stats.put("avgUsagePerRoom", 0);
        }

        return stats;
    }

    // Increment usage count for a hall
    public AddHallDto incrementUsageCount(Integer id) {
        Optional<AddHallEntity> hallOpt = addHallRepository.findById(id);
        if (hallOpt.isPresent()) {
            AddHallEntity hall = hallOpt.get();
            Integer currentCount = hall.getUsageCount() != null ? hall.getUsageCount() : 0;
            hall.setUsageCount(currentCount + 1);
            AddHallEntity updated = addHallRepository.save(hall);
            return convertToDto(updated);
        }
        return null;
    }
}