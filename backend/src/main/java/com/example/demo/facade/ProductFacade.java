package com.example.demo.facade;
import com.example.demo.model.*;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class ProductFacade {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private SizeService sizeService;
    @Autowired
    private CategorySizeService categorySizeService;
    @Autowired
    private ColorService colorService;
    @Autowired
    private CategoryColorService categoryColorService;
    @Autowired
    private CategoryTypeService categoryTypeService;
    @Autowired
    private UploadService uploadService;

    public ProductsDTO saveProductRelations(ProductsDTO productDTO) {
        // Save category
        CategoryDTO savedCategory = categoryService.returnSavedCategory(productDTO.getCategoryType());
        // Save Size
        SizeDTO savedSize = sizeService.save(productDTO.getSize()).getBody();
        // Save category size
        categorySizeService.savedCategorySize(savedCategory, savedSize);
        // Save color
        ColorDTO savedColor = colorService.save(productDTO.getColor()).getBody();
        // Save category color
        categoryColorService.savedCategoryColor(savedCategory, savedColor);
        //save image
        uploadService.save(savedCategory, productDTO.getImages());
        productDTO.setCategory(savedCategory);
        productDTO.setColor(savedColor);
        productDTO.setSize(savedSize);
        return productDTO;
    }
}
