package com.example.pafbackend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.pafbackend.models.UserProfile;
import com.example.pafbackend.repositories.UserProfileRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/userProfiles")      // Base route for all UserProfile-related endpoints

public class UserProfileController {

    @Autowired
    private UserProfileRepository userProfileRepository;

    // POST: Create and store a new UserProfile in the database
    @PostMapping
    public UserProfile createUserProfile(@RequestBody UserProfile userProfile) {
        return userProfileRepository.save(userProfile);
    }

    // GET: Fetch all user profiles stored in the system
    @GetMapping
    public List<UserProfile> getAllUserProfiles() {
        return userProfileRepository.findAll();
    }

    // GET: Retrieve a single UserProfile by its unique ID
    @GetMapping("/{id}")
    public ResponseEntity<UserProfile> getUserProfileById(@PathVariable String id) {
        Optional<UserProfile> userProfile = userProfileRepository.findById(id);
        return userProfile.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET: Retrieve a list of user profiles based on userId (foreign key or linked field)
    @GetMapping("/user/{userId}")
    public List<UserProfile> getUserProfileByUserId(@PathVariable String userId) {
        return userProfileRepository.findByUserId(userId);
    }

    // PUT: Update an existing UserProfile with new data
    @PutMapping("/{id}")
    public ResponseEntity<UserProfile> updateUserProfile(@PathVariable String id, @RequestBody UserProfile userProfileDetails) {
        return userProfileRepository.findById(id).map(existingUserProfile -> {
            // Apply updates
            existingUserProfile.setImage(userProfileDetails.getImage());
            existingUserProfile.setBiography(userProfileDetails.getBiography());
            existingUserProfile.setFitnessGoals(userProfileDetails.getFitnessGoals());
            existingUserProfile.setProfileVisibility(userProfileDetails.isProfileVisibility());
            // Save and return the updated profile
            UserProfile updatedUserProfile = userProfileRepository.save(existingUserProfile);
            return ResponseEntity.ok(updatedUserProfile);
        }).orElseGet(() -> ResponseEntity.notFound().build());      // If not found, return 404
    }

    // DELETE: Remove a user profile from the system using its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserProfile(@PathVariable String id) {
        Optional<UserProfile> userProfile = userProfileRepository.findById(id);
        if (userProfile.isPresent()) {
            userProfileRepository.deleteById(id);
            return ResponseEntity.ok().build();         // Return 200 OK on successful deletion
        } else {
            return ResponseEntity.notFound().build();    // Return 404 if not found
        }
    }
}
