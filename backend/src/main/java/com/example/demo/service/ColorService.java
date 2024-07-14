package com.example.demo.service;
import com.example.demo.entity.Color;
import com.example.demo.model.ColorDTO;
import org.springframework.http.ResponseEntity;
import java.util.*;

public interface ColorService {
    List<ColorDTO> getAll();
    ColorDTO getById(Long id) throws Exception ;
    ResponseEntity<ColorDTO> save(ColorDTO colorDTO);
    ResponseEntity<Color> update (Long id, ColorDTO colorDTO) throws Exception ;
    ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message);
    ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception;

}
