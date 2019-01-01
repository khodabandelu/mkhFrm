package org.mkh.framework.security;

import org.mkh.framework.domain.security.User;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * Implementation of AuditorAware based on Spring Security.
 */
@Component
public class SpringSecurityAuditorAware implements AuditorAware<User> {

    @Override
    public Optional<User> getCurrentAuditor() {
        return Optional.of(SecurityUtils.getCurrentUser().orElse(User.builder().id(1L).build()));
    }
}
