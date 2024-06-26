package com.example.demo.service.Impl;
import com.example.demo.Adapter.SizeAdapter;
import com.example.demo.Exception.Size.SizeNotFoundException;
import com.example.demo.entity.Size;
import com.example.demo.helper.Helper;
import com.example.demo.model.SizeDTO;
import com.example.demo.repository.SizeRepository;
import com.example.demo.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

@Service
public class SizeServiceImpl implements SizeService {

    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public List<SizeDTO> getAll() {
        List<Size> sizes = sizeRepository.findAll();
        return SizeAdapter.convertListEntityToDTO(sizes);
    }

    @Override
    public SizeDTO getById(Long id) throws Exception {
        Helper.validateId(id);
        Size size = sizeRepository.findById(id).orElseThrow( () ->  new SizeNotFoundException(id));
        return SizeAdapter.toDTO(size);
    }

    @Override
    public ResponseEntity<Size> save(SizeDTO sizeDTO) {
        Size size = SizeAdapter.toEntity(sizeDTO);
        size.setCreatedAt(Date.valueOf(LocalDate.now()));
        sizeRepository.save(size);
        return ResponseEntity.ok(size);
    }

    @Override
    public Size setSizeFields(Size size, SizeDTO sizeDTO) {
        sizeDTO.setLastModifiedAt(Date.valueOf(LocalDate.now()));
        size.setSize(sizeDTO.getSize());
        return size;
    }

    @Override
    public ResponseEntity<Size> update(Long id, SizeDTO sizeDTO) throws Exception {
        SizeDTO sizeFoundDTO = getById(id);
        Size size = SizeAdapter.toEntity(sizeFoundDTO);
        size = setSizeFields(size, sizeFoundDTO);
        return ResponseEntity.ok(sizeRepository.save(size));
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message) {
        boolean exists = sizeRepository.existsById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put(message, !exists);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception {
        SizeDTO sizeFoundDTO = this.getById(id);
        Size size = SizeAdapter.toEntity(sizeFoundDTO);
        sizeRepository.delete(size);
        return checkByIdExists(id, "deleted");
    }
}
