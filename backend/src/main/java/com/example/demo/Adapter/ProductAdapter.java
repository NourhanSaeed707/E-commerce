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
                        prod -> new ProductsDTO(prod.getId(), prod.getName(), prod.getCreatedAt(),prod.getCreatedBy(),
                                prod.getCodeNumber(),  prod.getPrice(), prod.getStock(), prod.getGender(),
                                prod.getCategory(), prod.getSize(), prod.getColor()))
                .collect(Collectors.toList());
    }
}
