package com.example.demo.service;
import com.example.demo.entity.CategoryType;
import com.example.demo.entity.Size;
import com.example.demo.model.SizeDTO;
import org.springframework.http.ResponseEntity;
import java.util.*;

public interface SizeService {
    List<SizeDTO> getAll();
    SizeDTO getById(Long id) throws Exception ;
    ResponseEntity<Size> save(SizeDTO sizeDTO);
    Size setSizeFields(Size size, SizeDTO sizeDTO);
    ResponseEntity<Size> update (Long id, SizeDTO sizeDTO) throws Exception ;
    ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message);
    ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception;
}
