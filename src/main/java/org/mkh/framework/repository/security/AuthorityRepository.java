package org.mkh.framework.repository.security;

import org.mkh.framework.domain.security.Authority;
import org.mkh.framework.repository.GenericRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuthorityRepository extends GenericRepository<Authority, Long> {
    Optional<Authority> findByName(String name);

    List<Authority> findAllByEnabledAndParentId(boolean enabled, Long parentId);

}
