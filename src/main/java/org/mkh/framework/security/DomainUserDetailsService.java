package org.mkh.framework.security;

import org.mkh.framework.domain.security.Authority;
import org.mkh.framework.domain.security.User;
import org.mkh.framework.repository.security.UserRepository;
import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class DomainUserDetailsService implements UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(DomainUserDetailsService.class);

    private final UserRepository userRepository;

    public DomainUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(final String username) {
        log.debug("Authenticating {}", username);

        if (new EmailValidator().isValid(username, null)) {
            return userRepository.findOneWithAuthoritiesByEmail(username)
                .map(user -> createSpringSecurityUser(username, user))
                .orElseThrow(() -> new UsernameNotFoundException("User with email " + username + " was not found in the database"));
        }

        String lowercaseUsername = username.toLowerCase(Locale.ENGLISH);
        return userRepository.findOneByUsername(lowercaseUsername)
            .map(user -> createSpringSecurityUser(lowercaseUsername, user))
            .orElseThrow(() -> new UsernameNotFoundException("User " + lowercaseUsername + " was not found in the database"));

    }

    private User createSpringSecurityUser(String lowercaseLogin, User user) {
        if (!user.isEnabled()) {
            throw new UserNotActivatedException("User " + lowercaseLogin + " was not enabled");
        }

        Set<Authority> authorities = new HashSet();
        authorities.add(Authority.builder().name("ROLE_USER").build());
        user.getGroups()
            .stream()
            .forEach(g -> g.getAuthorities()
                    .stream()
                    .forEach(authority -> authorities.add(Authority.builder().name("ROLE_" + authority.getName()).build())
                ));
        user.setAuthorities(authorities);

//        Set<GrantedAuthority> authorities = new HashSet();
//        authorities.add(Authority.builder().name("ROLE_USER").build());
//        user.getGroups()
//            .stream()
//            .forEach(g -> g.getAuthorities()
//                    .stream()
//                    .forEach(authority -> authorities.add(new SimpleGrantedAuthority("ROLE_" + authority.getName()))
//                ));
//        user.setAuthorities(authorities);
        return user;
    }
}
