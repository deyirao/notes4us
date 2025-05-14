package de.fourchads.notes4us.service;

import de.fourchads.notes4us.model.Note;
import de.fourchads.notes4us.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service // Indicates that this is a Spring service component
public class NoteService {

    private final NoteRepository noteRepository;

    @Autowired // Constructor injection for the repository
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public Optional<Note> getNoteById(Long id) {
        return noteRepository.findById(id);
    }

    public Note createNote(Note note) {
        // You might want to add validation or other business logic here
        return noteRepository.save(note);
    }

    public Note updateNote(Long id, Note noteDetails) {
        // Find the existing note
        Note existingNote = noteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + id)); // Or a custom exception

        // Update its fields
        existingNote.setTitle(noteDetails.getTitle());
        existingNote.setContent(noteDetails.getContent());
        // Timestamps (createdAt, updatedAt) are typically handled by JPA/Hibernate
        // automatically

        return noteRepository.save(existingNote);
    }

    public void deleteNote(Long id) {
        if (!noteRepository.existsById(id)) {
            throw new RuntimeException("Note not found with id: " + id); // Or a custom exception
        }
        noteRepository.deleteById(id);
    }
}