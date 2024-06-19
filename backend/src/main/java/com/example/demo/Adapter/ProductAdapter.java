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
        ProductsDTO productsDTO = new ProductsDTO();
        BeanUtils.copyProperties(product, productsDTO);
        return productsDTO;
    }

    public static List<ProductsDTO> convertListEntityToDTO(List<Product> products) {
        return products.stream().map(
                        prod -> new ProductsDTO(prod.getId(), prod.getName(), prod.getCodeNumber(),
                                prod.getCreatedAt(), prod.getCreatedBy(), prod.getSize(), prod.getStock(), prod.getGender(),
                                prod.getPrice(), prod.getColor(), prod.getCategory()))
                .collect(Collectors.toList());
    }
}
