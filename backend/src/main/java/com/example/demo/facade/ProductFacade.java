package com.example.demo.facade;
import com.example.demo.entity.Product;
import com.example.demo.model.*;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

//    public List<ProductColorDTO> saveProductColor(ProductsDTO productDTO) {
//        List<ProductColorDTO> productColorDTOList = new ArrayList<>();
//        for (int i = 0; i < productDTO.getColor().size(); i++) {
//            ProductColorDTO productColorDTO = new ProductColorDTO();
//            productColorDTO.setProduct(productDTO);
//            productColorDTO.setColor(productDTO.getColor().get(i));
//            productColorDTO.setCreatedAt(Date.valueOf(LocalDate.now()));
//            productColorDTOList.add(productColorService.save(productColorDTO).getBody());
//        }
//        return productColorDTOList;
//    }
    public void saveProductSize(ProductsDTO productDTO) {
        for (int i = 0; i < productDTO.getSize().size(); i++) {
            ProductSizeDTO productSizeDTO = new ProductSizeDTO();
            productSizeDTO.setSize(productDTO.getSize().get(i));
            productSizeDTO.setProduct(productDTO);
            productSizeDTO.setCreatedAt(Date.valueOf(LocalDate.now()));
            productSizeService.save(productSizeDTO);
        }
    }
    public ProductsDTO saveProductRelations(ProductsDTO productDTO) {
        // Save product first
        Product product = modelMapper.map(productDTO, Product.class);
        product.setCreatedAt(Date.valueOf(LocalDate.now()));
        Product savedProduct = productRepository.save(product);
        productDTO.setId(savedProduct.getId());
        // Save color and size
//        SizeDTO sizeDTO = sizeService.save(productDTO.getSize()).getBody();
//        ColorDTO colorDTO = colorService.save(productDTO.getColor()).getBody();
        // Save product color
//        List<ProductColorDTO> productColorDTOList  = new ArrayList<>();
//        productColorDTOList = saveProductColor(productDTO);
//        ProductColorDTO productColorDTO = new ProductColorDTO();
//        productColorDTO.setProduct(productDTO);
//        productColorDTO.setColor(colorDTO);
//        productColorDTO.setCreatedAt(Date.valueOf(LocalDate.now()));
//        productColorService.save(productColorDTO);
        // Save product size
        saveProductSize(productDTO);
        //save image
//        uploadService.save(savedProduct, productDTO.getImages());
//        uploadService.save(productColorDTOList, productDTO.getImages());
        return productDTO;
    }

    public saveProductColorImages(Long id, ColorDTO colorDTO, List<ImageDTO> imageDTOList)
}
