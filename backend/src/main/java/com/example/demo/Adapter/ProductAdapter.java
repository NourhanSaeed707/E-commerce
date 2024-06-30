package com.example.demo.Adapter;
import com.example.demo.entity.Product;
import com.example.demo.model.ProductsDTO;
import org.springframework.beans.BeanUtils;
import java.util.List;
import java.util.stream.Collectors;

public class ProductAdapter {

    public static Product toEntity (ProductsDTO productsDTO) {
        Product product = new Product();
        BeanUtils.copyProperties(productsDTO, product);
        return  product;
    }

    public static ProductsDTO toDTO(Product product) {
        ProductsDTO productDTO = new ProductsDTO();
        BeanUtils.copyProperties(product, productDTO);
        return productDTO;
    }

    public static List<ProductsDTO> convertListEntityToDTO(List<Product> products) {
        return products.stream().map(
                        prod -> {
                            ProductsDTO productDTO = toDTO(prod);
                            return new ProductsDTO(productDTO.getId(), productDTO.getName(), productDTO.getCreatedAt(),productDTO.getCreatedBy(),
                                    productDTO.getCodeNumber(),  productDTO.getPrice(), productDTO.getStock(), productDTO.getGender(),
                                    productDTO.getCategory(), productDTO.getCategoryType(), productDTO.getSize(), productDTO.getColor(),
                                    productDTO.getImages());
                        })
                .collect(Collectors.toList());
    }
}
