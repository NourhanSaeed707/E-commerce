package com.example.demo.controller;
import com.example.demo.entity.Size;
import com.example.demo.model.SizeDTO;
import com.example.demo.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/sizes")
@CrossOrigin("*")
public class SizeController {
    @Autowired
    private SizeService sizeService;

    @GetMapping("/get-all")
    @PreAuthorize("hasAuthority('ADMIN')")public ResponseEntity<List<SizeDTO>> getAll () {
        List<SizeDTO> sizes = sizeService.getAll();
        return ResponseEntity.ok(sizes);
    }

    @GetMapping("/get/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<SizeDTO> getById(@PathVariable Long id) throws Exception {
        SizeDTO size = sizeService.getById(id);
        return ResponseEntity.ok(size);
    }

    @PostMapping("/save")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<SizeDTO> save(@RequestBody SizeDTO sizeDTO) throws Exception {
        return  sizeService.save(sizeDTO);
    }

    @PutMapping("/edit/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Size> update(@PathVariable Long id, @RequestBody SizeDTO sizeDTO) throws Exception {
        return sizeService.update(id, sizeDTO);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> delete(@PathVariable Long id) throws Exception {
        return sizeService.delete(id);
    }
}
