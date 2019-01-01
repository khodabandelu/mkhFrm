package org.mkh.framework.service.dto.security;

import lombok.*;
import org.mkh.framework.domain.security.Authority;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MenuItemDTO {

//    private Long id;
//
//    private String name;

    private String title;

    private String src;

    //    private int sortOrder;
//
    private String icon;

    private Long parentId;


    //    private Boolean existsChild;
//
    private List<MenuItemDTO> children;

    public MenuItemDTO(Authority authority) {
//        this.id = authority.getId();
//        this.name = authority.getName();
        this.title = authority.getTitle();
        this.src = authority.getSrc();
//        this.sortOrder = authority.getSortOrder();
        this.icon = authority.getIcon();
        this.parentId = authority.getParent().getId();
//        this.existsChild = !authority.getChildren().isEmpty();
        this.children = authority.getChildren().stream()
            .map(MenuItemDTO::new)
            .collect(Collectors.toList());
    }

    public List<MenuItemDTO> getChildren() {
        if (children == null)
            this.children = new ArrayList<>();
        return children;
    }
}
