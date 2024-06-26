package com.example.demo.Adapter;
import com.example.demo.entity.Color;
import com.example.demo.model.ColorDTO;
import org.springframework.beans.BeanUtils;
import java.util.List;
import java.util.stream.Collectors;

public class ColorAdapter {
    public static Color toEntity (ColorDTO colorDTO) {
        Color color = new Color();
        BeanUtils.copyProperties(colorDTO, color);
        return  color;
    }

    public static ColorDTO toDTO(Color color) {
        ColorDTO colorDTO = new ColorDTO();
        BeanUtils.copyProperties(color, colorDTO);
        return colorDTO;
    }

    public static List<ColorDTO> convertListEntityToDTO(List<Color> colors) {
        return colors.stream().map(
                        color -> {
                            ColorDTO colorDTO = toDTO(color);
                            return new ColorDTO(colorDTO.getId(), colorDTO.getColor(),
                                    colorDTO.getCreatedAt(), colorDTO.getLastModifiedAt(), colorDTO.getCreatedBy(),
                                    colorDTO.getCategoryColors());
                        })
                .collect(Collectors.toList());
    }
}
