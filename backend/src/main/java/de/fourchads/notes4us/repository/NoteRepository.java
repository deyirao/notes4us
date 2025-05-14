package de.fourchads.notes4us.repository;

import de.fourchads.notes4us.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Indicates that this is a Spring Data repository
public interface NoteRepository extends JpaRepository<Note, Long> {
    // JpaRepository provides common CRUD methods like:
    // - findAll()
    // - findById(Long id)
    // - save(Note note)
    // - deleteById(Long id)
    // You can add custom query methods here if needed, e.g.:
    // List<Note> findByTitleContaining(String keyword);
}