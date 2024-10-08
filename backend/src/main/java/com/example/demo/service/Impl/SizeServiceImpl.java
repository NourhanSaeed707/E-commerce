package com.example.demo.service.Impl;
import com.example.demo.Exception.Size.SizeNotFoundException;
import com.example.demo.entity.Product;
import com.example.demo.entity.Size;
import com.example.demo.helper.Helper;
import com.example.demo.model.SizeDTO;
import com.example.demo.repository.SizeRepository;
import com.example.demo.service.SizeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class SizeServiceImpl implements SizeService {

    @Autowired
    private SizeRepository sizeRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<SizeDTO> getAll() {
        List<Size> sizes = sizeRepository.findAll();
        return sizes.stream().map(size -> modelMapper.map(size, SizeDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Page<SizeDTO> getAllPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Size> sizePage = sizeRepository.findAll(pageable);
        Page<SizeDTO> sizesDTOPage = sizePage.map(sizeVal -> modelMapper.map(sizeVal, SizeDTO.class));
        return  sizesDTOPage;
    }

    @Override
    public SizeDTO getById(Long id) throws Exception {
        Helper.validateId(id);
        Size size = sizeRepository.findById(id).orElseThrow( () ->  new SizeNotFoundException(id));
        return modelMapper.map(size, SizeDTO.class);
    }

    @Override
    public ResponseEntity<SizeDTO> save(SizeDTO sizeDTO) {
        Size size = modelMapper.map(sizeDTO, Size.class);
        size.setCreatedAt(Date.valueOf(LocalDate.now()));
        Size saved = sizeRepository.save(size);
        return ResponseEntity.ok(modelMapper.map(saved, SizeDTO.class));
    }

    @Override
    public List<SizeDTO> getSizeByListOfIds(List<Long> sizeIds) {
        List<SizeDTO> sizeDTOS = new ArrayList<>();
        sizeIds.forEach(sizeId -> {
            Size size = sizeRepository.getById(sizeId);
            sizeDTOS.add(modelMapper.map(size, SizeDTO.class));
        });
        return sizeDTOS;
    }

    @Override
    public ResponseEntity<Size> update(Long id, SizeDTO sizeDTO) throws Exception {
        Size size = sizeRepository.getById(id);
        size.setSize(sizeDTO.getSize());
        size.setLastModifiedAt(Date.valueOf(LocalDate.now()));
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
        Size size = sizeRepository.getById(id);
        sizeRepository.delete(size);
        return checkByIdExists(id, "deleted");
    }
}
