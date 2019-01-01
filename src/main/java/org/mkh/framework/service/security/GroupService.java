package org.mkh.framework.service.security;


import org.mkh.framework.domain.security.Authority;
import org.mkh.framework.domain.security.Group;
import org.mkh.framework.service.GenericService;
import org.mkh.framework.service.dto.security.GroupDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

public interface GroupService extends GenericService<Group, Long> {
    @Transactional
    Group create(GroupDTO groupDTO);

    @Transactional
    Group update(GroupDTO groupDTO);

    @Transactional
    Group updateAuthorities(GroupDTO groupDTO);

    @Transactional
    Group removeUserGroup(Long groupId,Long userId);

    @Transactional
    Group saveAuthorities(Long groupId, Set<Authority> authorities);

    @Transactional
    Group addUserGroup(Long groupId, Long userId);

    @Transactional(readOnly = true)
    Optional<GroupDTO> getGroupWithAuthorities(Long id);
//    Group update(GroupDTO groupDTO);
//
//    Group saveAuthorities(Long groupId, Set<Authority> authorities);
//
//    Page<User> searchUserByGroupId(Long groupId, String username, String firstName, String lastName, Integer powerId, Pageable pageable);
//
//    Group create(GroupDTO groupDTO);
}
