package com.example.demo.controller;
import com.example.demo.entity.CategoryType;
import com.example.demo.model.CategoryTypeDTO;
import com.example.demo.service.CategoryTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/category-type")
@CrossOrigin("*")
public class CategoryTypeController {
    @Autowired
    private CategoryTypeService categoryTypeService;

    @GetMapping("/get-all")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<List<CategoryTypeDTO>> getAll() {
        List<CategoryTypeDTO> categoryTypes = categoryTypeService.getAll();
        return ResponseEntity.ok(categoryTypes);
    }

    @GetMapping("/get-all-paginated")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Page<CategoryTypeDTO>> getAllPaginated(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        Page<CategoryTypeDTO> categoryTypes = categoryTypeService.getAllPaginated(page, size);
        return ResponseEntity.ok(categoryTypes);
    }

    @GetMapping("/get/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CategoryTypeDTO> getById(@PathVariable Long id) throws Exception {
        CategoryTypeDTO categoryTypeDTO = categoryTypeService.getById(id);
        return ResponseEntity.ok(categoryTypeDTO);
    }

    @PostMapping("/save")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CategoryTypeDTO> save(@RequestBody CategoryTypeDTO categoryTypeDTO) {
        return  categoryTypeService.save(categoryTypeDTO);
    }

    @PutMapping("/edit/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<CategoryType> update(@PathVariable Long id, @RequestBody CategoryTypeDTO categoryTypeDTO) throws Exception {
        return categoryTypeService.update(id, categoryTypeDTO);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> delete(@PathVariable Long id) throws Exception {
        return categoryTypeService.delete(id);
    }


}
