package com.example.pafbackend.controllers;

import com.example.pafbackend.models.Notification;
import com.example.pafbackend.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")        // Root endpoint for handling all notification-related API calls
public class NotificationController {

    private final NotificationRepository notificationRepository;

    // Inject NotificationRepository using constructor injection for better testability and maintainability
    @Autowired
    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    // GET: Retrieve and return a list of all notifications in the system
    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {
        List<Notification> notifications = notificationRepository.findAll();
        // Respond with 200 OK and the list of notifications
        return new ResponseEntity<>(notifications, HttpStatus.OK);
    }

    // POST: Accept a notification object and persist it to the database
    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
        // Save the new notification and return it with 201 Created
        Notification savedNotification = notificationRepository.save(notification);
        return new ResponseEntity<>(savedNotification, HttpStatus.CREATED);
    }


}
