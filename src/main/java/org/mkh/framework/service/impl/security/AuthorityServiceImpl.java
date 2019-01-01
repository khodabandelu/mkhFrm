package org.mkh.framework.service.impl.security;

import org.mkh.framework.domain.security.Authority;
import org.mkh.framework.repository.security.AuthorityRepository;
import org.mkh.framework.security.SecurityUtils;
import org.mkh.framework.service.dto.security.AuthorityDTO;
import org.mkh.framework.service.dto.security.MenuItemDTO;
import org.mkh.framework.service.impl.GenericServiceImpl;
import org.mkh.framework.service.security.AuthorityService;
import org.mkh.framework.service.security.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthorityServiceImpl extends GenericServiceImpl<Authority, Long> implements AuthorityService {

    private final Logger log = LoggerFactory.getLogger(AuthorityServiceImpl.class);

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private UserService userService;

    @Override
    @Transactional(readOnly = true)
    public List<String> getAll() {
        return authorityRepository.findAll().stream().map(Authority::getName).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<Authority> getAllAuthorities() {
        return authorityRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Authority> getAllByEnabled(boolean enabled, Long parentId) {
        return authorityRepository.findAllByEnabledAndParentId(enabled, parentId);
    }

    @Override
    @Transactional(readOnly = true)
    public MenuItemDTO makeMenuItems(Long parentId) {
//        Authority authority = findById(parentId).get();
        MenuItemDTO root = MenuItemDTO.builder().children(new ArrayList<>()).build();
        make(parentId, root);
        return root;
    }

    private void make(Long parentId, MenuItemDTO root) {
        List<Authority> children = userService.findAuthoritiesWereAccessed(true, SecurityUtils.getCurrentUserId().get(), parentId);
        children.stream().forEach(auth -> {
            MenuItemDTO node = MenuItemDTO.builder()
                .title(auth.getTitle())
                .src(auth.getSrc())
                .icon(auth.getIcon())
                .build();
            root.getChildren().add(node);
            menuBuilder(node, auth);
        });
    }

    public void menuBuilder(MenuItemDTO menuItem, Authority authority) {
        make(authority.getId(), menuItem);
    }


    @Override
    @Transactional(readOnly = true)
    public Page<AuthorityDTO> getAllGrid(Pageable pageable) {
        return findAllGrid(pageable).map(AuthorityDTO::new);
    }
}
