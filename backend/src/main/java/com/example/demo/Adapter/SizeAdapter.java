package com.example.demo.Adapter;

import com.example.demo.entity.Product;
import com.example.demo.entity.Size;
import com.example.demo.model.ProductsDTO;
import com.example.demo.model.SizeDTO;
import org.springframework.beans.BeanUtils;
import java.util.List;
import java.util.stream.Collectors;

public class SizeAdapter {

    public static Size toEntity (SizeDTO sizeDTO) {
        Size size = new Size();
        BeanUtils.copyProperties(sizeDTO, size);
        return size;
    }

    public static SizeDTO toDTO(Size size) {
        SizeDTO sizeDTO = new SizeDTO();
        BeanUtils.copyProperties(size, sizeDTO);
        return sizeDTO;
    }

    public static List<SizeDTO> convertListEntityToDTO(List<Size> sizes) {
        return sizes.stream().map(
                        size -> new SizeDTO(size.getId(), size.getSize(),
                                size.getCreatedAt(), size.getCreatedBy(),size.getCategorySizes(), size.getLastModifiedAt()
                               ))
                .collect(Collectors.toList());
    }
}
