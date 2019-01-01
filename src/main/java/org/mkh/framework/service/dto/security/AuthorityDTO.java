package org.mkh.framework.service.dto.security;

import lombok.*;
import org.mkh.framework.domain.security.Authority;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthorityDTO {

    private Long id;

    private String name;

    private String title;

    private String src;

    private int sortOrder;

    private boolean enabled;

    private String icon;

    private Long parentId;

    public AuthorityDTO(Authority authority) {
        this.id = authority.getId();
        this.name = authority.getName();
        this.title = authority.getTitle();
        this.src = authority.getSrc();
        this.sortOrder = authority.getSortOrder();
        this.enabled = authority.isEnabled();
        this.icon = authority.getIcon();
        this.parentId = authority.getParent().getId();
    }

}
