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
                        color -> new ColorDTO(color.getId(), color.getColor(),
                                color.getCreatedAt(), color.getCreatedBy(), color.getLastModifiedAt(),
                               color.getCategoryColors()
                        ))
                .collect(Collectors.toList());
    }
}
