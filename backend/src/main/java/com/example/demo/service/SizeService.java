package com.example.demo.service;
import com.example.demo.entity.Size;
import com.example.demo.model.SizeDTO;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import java.util.*;

public interface SizeService {
    List<SizeDTO> getAll();
    Page<SizeDTO> getAllPaginated(int page, int size);
    SizeDTO getById(Long id) throws Exception ;
    ResponseEntity<SizeDTO> save(SizeDTO sizeDTO);
    List<SizeDTO> getSizeByListOfIds(List<Long> sizeIds);
    ResponseEntity<Size> update (Long id, SizeDTO sizeDTO) throws Exception ;
    ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message);
    ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception;
}
