package de.fourchads.notes4us.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

// Temporary record for Note structure. Will be replaced by a JPA entity.
record Note(long id, String title, String content) {
}

@RestController
@RequestMapping("/api/notes") // Base path for all endpoints in this controller
public class NoteController {

    @GetMapping
    public List<Note> getAllNotes() {
        // Return a hardcoded list of notes for now
        return Arrays.asList(
                new Note(1L, "Grocery List", "Milk, Eggs, Bread, Cheese, Apples"),
                new Note(2L, "Meeting Notes - Project Phoenix",
                        "Discussed Q3 roadmap. Key takeaways: finalize UI mockups by next week, schedule user testing for Sprint 2. Action items assigned."),
                new Note(3L, "Book Recommendations",
                        "1. 'The Pragmatic Programmer' by Andrew Hunt and David Thomas\n2. 'Clean Code' by Robert C. Martin\n3. 'Designing Data-Intensive Applications' by Martin Kleppmann"),
                new Note(4L, "Weekend Plans",
                        "Saturday: Morning hike, afternoon coding session on notes app. Sunday: Brunch with friends, relax."));
    }

    // Later, you'll add more methods here for:
    // @GetMapping("/{id}") - Get a single note by ID
    // @PostMapping - Create a new note
    // @PutMapping("/{id}") - Update an existing note
    // @DeleteMapping("/{id}") - Delete a note
}