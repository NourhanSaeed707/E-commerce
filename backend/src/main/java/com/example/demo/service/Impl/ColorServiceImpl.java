package com.example.demo.service.Impl;
import com.example.demo.Exception.Color.ColorNotFoundException;
import com.example.demo.entity.Color;
import com.example.demo.helper.Helper;
import com.example.demo.model.ColorDTO;
import com.example.demo.repository.ColorRepository;
import com.example.demo.service.ColorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.sql.Date;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ColorServiceImpl implements ColorService {

    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ColorDTO> getAll() {
        List<Color> colors = colorRepository.findAll();
        return colors.stream().map( color -> modelMapper.map(color, ColorDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ColorDTO getById(Long id) throws Exception {
        Helper.validateId(id);
        Color color = colorRepository.findById(id).orElseThrow( () ->  new ColorNotFoundException(id));
        return modelMapper.map(color, ColorDTO.class);
    }

    @Override
    public ResponseEntity<ColorDTO> save(ColorDTO colorDTO) {
        Color color = modelMapper.map(colorDTO, Color.class);
        color.setCreatedAt(Date.valueOf(LocalDate.now()));
        Color saved = colorRepository.save(color);
        return ResponseEntity.ok(modelMapper.map(saved, ColorDTO.class));
    }

    @Override
    public ResponseEntity<Color> update(Long id, ColorDTO colorDTO) throws Exception {
        Color color = colorRepository.getById(id);
        color.setLastModifiedAt(Date.valueOf(LocalDate.now()));
        color.setColor(colorDTO.getColor());
        return ResponseEntity.ok(colorRepository.save(color));
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> checkByIdExists(Long id, String message) {
        boolean exists = colorRepository.existsById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put(message, !exists);
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<Map<String, Boolean>> delete(Long id) throws Exception {
        Color color = colorRepository.getById(id);
        colorRepository.delete(color);
        return checkByIdExists(id, "deleted");
    }
}
