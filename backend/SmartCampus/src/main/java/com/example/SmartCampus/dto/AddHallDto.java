// AddHallDto.java
package com.example.SmartCampus.dto;

import java.util.List;
import java.util.Map;

public class AddHallDto {

    private Integer id;
    private String name;
    private String type;
    private String capacity;
    private String location;
    private String status;
    private String coverImage;
    private String description;
    private Map<String, Boolean> facilities;
    private List<TimeSlotDto> timeSlots;
    private Integer usageCount;
    private List<Integer> weeklyUsage;

    // Inner class for time slots DTO
    public static class TimeSlotDto {
        private String day;
        private List<String> slots;

        public String getDay() { return day; }
        public void setDay(String day) { this.day = day; }
        public List<String> getSlots() { return slots; }
        public void setSlots(List<String> slots) { this.slots = slots; }
    }

    // Constructors
    public AddHallDto() {}

    public AddHallDto(Integer id, String name, String type, String capacity, String location,
                      String status, String coverImage, String description, Map<String, Boolean> facilities,
                      List<TimeSlotDto> timeSlots, Integer usageCount, List<Integer> weeklyUsage) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.capacity = capacity;
        this.location = location;
        this.status = status;
        this.coverImage = coverImage;
        this.description = description;
        this.facilities = facilities;
        this.timeSlots = timeSlots;
        this.usageCount = usageCount;
        this.weeklyUsage = weeklyUsage;
    }

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getCapacity() { return capacity; }
    public void setCapacity(String capacity) { this.capacity = capacity; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getCoverImage() { return coverImage; }
    public void setCoverImage(String coverImage) { this.coverImage = coverImage; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Map<String, Boolean> getFacilities() { return facilities; }
    public void setFacilities(Map<String, Boolean> facilities) { this.facilities = facilities; }
    public List<TimeSlotDto> getTimeSlots() { return timeSlots; }
    public void setTimeSlots(List<TimeSlotDto> timeSlots) { this.timeSlots = timeSlots; }
    public Integer getUsageCount() { return usageCount; }
    public void setUsageCount(Integer usageCount) { this.usageCount = usageCount; }
    public List<Integer> getWeeklyUsage() { return weeklyUsage; }
    public void setWeeklyUsage(List<Integer> weeklyUsage) { this.weeklyUsage = weeklyUsage; }
}