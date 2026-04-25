package com.example.SmartCampus.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.Date;

@Document(collection = "equipment")
public class EquipmentEntity {

    @Id
    private Integer id;

    @Field("name")
    private String name;

    @Field("category")
    private String category;

    @Field("status")
    private String status;

    @Field("image")
    private String image;

    @Field("description")
    private String description;

    @Field("addedDate")
    private Date addedDate;

    @Field("lastUpdated")
    private Date lastUpdated;

    // Constructors
    public EquipmentEntity() {}

    public EquipmentEntity(Integer id, String name, String category, String status,
                           String image, String description, Date addedDate, Date lastUpdated) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.status = status;
        this.image = image;
        this.description = description;
        this.addedDate = addedDate;
        this.lastUpdated = lastUpdated;
    }

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Date getAddedDate() { return addedDate; }
    public void setAddedDate(Date addedDate) { this.addedDate = addedDate; }

    public Date getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(Date lastUpdated) { this.lastUpdated = lastUpdated; }
}