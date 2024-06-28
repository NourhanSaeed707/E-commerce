package com.example.demo.facade;
import com.example.demo.model.*;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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

    public ProductsDTO saveProductRelations(ProductsDTO productDTO) {
        System.out.println("saaaved produucct relaaaaaaations" + productDTO);
        System.out.println("product categooory type: " + productDTO.getCategoryType());
        // Save category
        CategoryDTO savedCategory = categoryService.returnSavedCategory(productDTO.getCategoryType());
        System.out.println("saveeed categoooory: "+ savedCategory);
        // Save Size
        SizeDTO savedSize = sizeService.save(productDTO.getSize()).getBody();
        // Save category size
        categorySizeService.savedCategorySize(savedCategory, savedSize);
        // Save color
        ColorDTO savedColor = colorService.save(productDTO.getColor()).getBody();
        // Save category color
        categoryColorService.savedCategoryColor(savedCategory, savedColor);
        productDTO.setCategory(savedCategory);

        return productDTO;
    }
}
