package com.example.pafbackend.controllers;

import com.example.pafbackend.models.LearningProgress;
import com.example.pafbackend.repositories.LearningProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/LearningProgresss")      // Base route for all endpoints in this controller
public class LearningProgressController {

    private final LearningProgressRepository LearningProgressRepository;

    // Constructor-based dependency injection for the repository
    @Autowired
    public LearningProgressController(LearningProgressRepository LearningProgressRepository) {
        this.LearningProgressRepository = LearningProgressRepository;
    }

    // GET: Retrieve all learning progress records
    @GetMapping
    public ResponseEntity<List<LearningProgress>> getLearningProgresss() {
        List<LearningProgress> LearningProgresss = LearningProgressRepository.findAll();
        return new ResponseEntity<>(LearningProgresss, HttpStatus.OK);
    }

    // GET: Retrieve learning progress records for a specific user by userId
    @GetMapping("/{userId}")
    public ResponseEntity<List<LearningProgress>> getLearningProgresssByUserId(@PathVariable String userId) {
        List<LearningProgress> LearningProgresss = LearningProgressRepository.findByUserId(userId);
        return new ResponseEntity<>(LearningProgresss, HttpStatus.OK);
    }

    // POST: Create a new learning progress entry
    @PostMapping
    public ResponseEntity<LearningProgress> createLearningProgress(@RequestBody LearningProgress LearningProgress) {
        LearningProgress savedLearningProgress = LearningProgressRepository.save(LearningProgress);
        return new ResponseEntity<>(savedLearningProgress, HttpStatus.CREATED);
    }

    // DELETE: Remove a learning progress entry by its ID
    @DeleteMapping("/{LearningProgressId}")
    public ResponseEntity<Void> deleteLearningProgress(@PathVariable String LearningProgressId) {
        LearningProgressRepository.deleteById(LearningProgressId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // PUT: Update an existing learning progress entry by its ID
    @PutMapping("/{LearningProgressId}")
    public ResponseEntity<LearningProgress> updateLearningProgress(@PathVariable String LearningProgressId, @RequestBody LearningProgress updatedLearningProgress) {
        Optional<LearningProgress> existingLearningProgressOptional = LearningProgressRepository.findById(LearningProgressId);
        
        if (existingLearningProgressOptional.isPresent()) {
            LearningProgress existingLearningProgress = existingLearningProgressOptional.get();
            
            // Update fields with new values
            existingLearningProgress.setUserId(updatedLearningProgress.getUserId());
            existingLearningProgress.setRoutines(updatedLearningProgress.getRoutines());
            existingLearningProgress.setPlanName(updatedLearningProgress.getPlanName());
            existingLearningProgress.setDescription(updatedLearningProgress.getDescription());
            existingLearningProgress.setGoal(updatedLearningProgress.getGoal());

            // Save updated entity
            LearningProgress savedLearningProgress = LearningProgressRepository.save(existingLearningProgress);
            return new ResponseEntity<>(savedLearningProgress, HttpStatus.OK);
        } 
        else 
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);     // Return 404 if not found
        }
    }

}
