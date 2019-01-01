package org.mkh.framework.repository.security;


import org.mkh.framework.domain.security.Group;
import org.mkh.framework.repository.GenericRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GroupRepository extends GenericRepository<Group, Long> {

    @EntityGraph(attributePaths = "authorities")
    Optional<Group> findOneWithAuthoritiesById(Long Id);

    @EntityGraph(attributePaths = "users")
    Optional<Group> findOneWithUsersById(Long Id);
}
