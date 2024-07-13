package com.example.demo.facade;
import com.example.demo.entity.Product;
import com.example.demo.model.*;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class ProductFacade {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SizeService sizeService;
    @Autowired
    private ProductSizeService productSizeService;
    @Autowired
    private ColorService colorService;
    @Autowired
    private ProductColorService productColorService;
    @Autowired
    private UploadService uploadService;
    @Autowired
    private ModelMapper modelMapper;

    public ProductsDTO saveProductRelations(ProductsDTO productDTO) {
        // Save product first
        Product product = modelMapper.map(productDTO, Product.class);
        Product savedProduct = productRepository.save(product);
        productDTO.setId(savedProduct.getId());
        // Save color and size
        SizeDTO sizeDTO = sizeService.save(productDTO.getSize()).getBody();
        ColorDTO colorDTO = colorService.save(productDTO.getColor()).getBody();
        // Save product color
        ProductColorDTO productColorDTO = new ProductColorDTO();
        productColorDTO.setProduct(productDTO);
        productColorDTO.setColor(colorDTO);
        productColorService.save(productColorDTO);
        // Save product size
        ProductSizeDTO productSizeDTO = new ProductSizeDTO();
        productSizeDTO.setSize(sizeDTO);
        productSizeDTO.setProduct(productDTO);
        productSizeService.save(productSizeDTO);
        //save image
        uploadService.save(savedProduct, productDTO.getImages());
        return productDTO;
    }
}
