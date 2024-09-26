package com.example.demo.controller;
import com.example.demo.entity.Color;
import com.example.demo.model.ColorDTO;
import com.example.demo.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/colors")
@CrossOrigin("*")
public class ColorController {
    @Autowired
    private ColorService colorService;

    @GetMapping("/get-all")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<List<ColorDTO>> getAll () {
        List<ColorDTO> colors = colorService.getAll();
        return ResponseEntity.ok(colors);
    }

    @GetMapping("/get/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ColorDTO> getById(@PathVariable Long id) throws Exception {
        ColorDTO color = colorService.getById(id);
        return ResponseEntity.ok(color);
    }

    @PostMapping("/save")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ColorDTO> save(@RequestBody ColorDTO colorDTO) throws Exception {
        return  colorService.save(colorDTO);
    }

    @PutMapping("/edit/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Color> update(@PathVariable Long id, @RequestBody ColorDTO colorDTO) throws Exception {
        return colorService.update(id, colorDTO);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Map<String, Boolean>> delete(@PathVariable Long id) throws Exception {
        return colorService.delete(id);
    }

}
