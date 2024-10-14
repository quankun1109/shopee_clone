package com.nhq.app.model;


public class Product {
    private int id;
    private String name;
    private double oldPrice;
    private double currentPrice;
    private String imageUrl;
    private String brand;
    private String origin;
    private float rating;
    private int sold;
    private int discountPercent;
    private byte like;
    private byte love;

    // Getters và Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public double getOldPrice() { return oldPrice; }
    public void setOldPrice(double oldPrice) { this.oldPrice = oldPrice; }

    public double getCurrentPrice() { return currentPrice; }
    public void setCurrentPrice(double currentPrice) { this.currentPrice = currentPrice; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }

    public float getRating() { return rating; }
    public void setRating(float rating) { this.rating = rating; }

    public int getSold() { return sold; }
    public void setSold(int sold) { this.sold = sold; }

    public int getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(int discountPercent) { this.discountPercent = discountPercent; }

    public byte getLike() { return like; }
    public void setLike(byte like) { this.like = like; }

    public byte getLove() { return love; }
    public void setLove(byte love) { this.love = love; }
}
