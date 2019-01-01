package org.mkh.framework.web.rest.security;

import org.mkh.framework.service.dto.security.AuthorityDTO;
import org.mkh.framework.service.dto.security.MenuItemDTO;
import org.mkh.framework.service.impl.security.AuthorityServiceImpl;
import org.mkh.framework.service.mapper.AuthorityMapper;
import org.mkh.framework.web.rest.util.PaginationUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/authorities")
public class AuthorityResource {

    private final Logger log = LoggerFactory.getLogger(AuthorityResource.class);

    @Autowired
    private AuthorityServiceImpl authorityService;

    @GetMapping("/getAllGrid")
    public ResponseEntity<List<AuthorityDTO>> getAllGrid(Pageable pageable) {
        final Page<AuthorityDTO> page = authorityService.getAllGrid(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/authorities");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    @GetMapping("/")
    public List<String> getAuthorities() {
        return authorityService.getAll();
    }

    @GetMapping("/all")
    public List<AuthorityDTO> getAllAuthorities() {
        return AuthorityMapper.mapper.toListDto(authorityService.getAllAuthorities());
    }

    @GetMapping("/menu")
    public MenuItemDTO makeMenuItems() {
        return authorityService.makeMenuItems(null);
    }

}
