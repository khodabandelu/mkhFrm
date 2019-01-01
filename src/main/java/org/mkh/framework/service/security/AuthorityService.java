package org.mkh.framework.service.security;


import org.mkh.framework.domain.security.Authority;
import org.mkh.framework.service.GenericService;
import org.mkh.framework.service.dto.security.AuthorityDTO;
import org.mkh.framework.service.dto.security.MenuItemDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AuthorityService extends GenericService<Authority, Long> {

    @Transactional(readOnly = true)
    List<String> getAll();

    @Transactional(readOnly = true)
    List<Authority> getAllAuthorities();

    @Transactional(readOnly = true)
    List<Authority> getAllByEnabled(boolean enabled, Long parentId);

    @Transactional(readOnly = true)
    MenuItemDTO makeMenuItems(Long parentId);

    @Transactional(readOnly = true)
    Page<AuthorityDTO> getAllGrid(Pageable pageable);
}
