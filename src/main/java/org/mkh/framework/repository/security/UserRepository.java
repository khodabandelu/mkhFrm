package org.mkh.framework.repository.security;

import org.mkh.framework.domain.security.Authority;
import org.mkh.framework.domain.security.User;
import org.mkh.framework.repository.GenericRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends GenericRepository<User, Long> {

    String USERS_BY_USERNAME_CACHE = "usersByUsername";

    String USERS_BY_EMAIL_CACHE = "usersByEmail";

    Optional<User> findOneByActivationKey(String activationKey);

    List<User> findAllByEnabledIsFalseAndCreatedDateBefore(Instant dateTime);

    Optional<User> findOneByResetKey(String resetKey);

    Optional<User> findOneByEmailIgnoreCase(String email);

    Optional<User> findOneByUsername(String username);

    @EntityGraph(attributePaths = "authorities")
    Optional<User> findOneWithAuthoritiesById(Long id);

    @EntityGraph(attributePaths = "groups")
    Optional<User> findOneWithGroupsById(Long id);

    @EntityGraph(attributePaths = "authorities")
//    @Cacheable(cacheNames = USERS_BY_USERNAME_CACHE)
    @Transactional(readOnly = true)
    Optional<User> findOneWithAuthoritiesByUsername(String username);

    @EntityGraph(attributePaths = "authorities")
//    @Cacheable(cacheNames = USERS_BY_EMAIL_CACHE)
    Optional<User> findOneWithAuthoritiesByEmail(String email);

    Page<User> findAllByUsernameNot(Pageable pageable, String username);

    @Query("select distinct a from User u" +
        " inner join u.groups g " +
        " inner join g.authorities a" +
        " where u.id = ?1 and a.enabled = ?2 and ((( null !=?3 ) and a.parent.id = ?3) or ((null=?3 ) and a.parent.id is null))   " +
        " order by a.sortOrder asc ")
    List<Authority> findAuthoritiesWereAccessed(Long userId, Boolean enabled, Long parentId);

}
