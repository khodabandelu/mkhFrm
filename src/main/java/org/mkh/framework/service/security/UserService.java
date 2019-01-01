package org.mkh.framework.service.security;


import org.mkh.framework.domain.security.Authority;
import org.mkh.framework.domain.security.User;
import org.mkh.framework.service.GenericService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserService extends GenericService<User, Long> {
    @Transactional(readOnly = true)
    List<Authority> findAuthoritiesWereAccessed(boolean enabled, Long userId, Long parentId);

    @Transactional
    User addGroup(Long userId, Long groupId);
//    Boolean existsByUsername(String username);
//
//    Boolean existsByEmail(String email);
//
//    User findByUsername(String username);
//
//    @Transactional
//    User create(UserDTO userDTO);
//
////    void delete(Long id);
//
////    User findById(Long id);
//
//    User update(UserDTO userDTO);
//
//    User registerUser(UserDTO userDTO, String password);
//
//    User activateRegistration(String key);
//
//    void completePasswordReset(String newPassword, String key);
//
//    void requestPasswordReset(String mail);
//
//    void requestPasswordReset(Long id);
//
//    void changePassword(String currentClearTextPassword, String newPassword);
//
//    @Transactional
//    void addGroup(long userId, long groupId);
}
