package org.mkh.framework.service.impl.security;

import org.mkh.framework.config.Constants;
import org.mkh.framework.domain.security.Authority;
import org.mkh.framework.domain.security.Group;
import org.mkh.framework.domain.security.User;
import org.mkh.framework.repository.security.AuthorityRepository;
import org.mkh.framework.repository.security.UserRepository;
import org.mkh.framework.security.AuthoritiesConstants;
import org.mkh.framework.security.SecurityUtils;
import org.mkh.framework.service.dto.security.UserDTO;
import org.mkh.framework.service.impl.GenericServiceImpl;
import org.mkh.framework.service.security.UserService;
import org.mkh.framework.service.util.RandomUtil;
import org.mkh.framework.web.rest.errors.EmailAlreadyUsedException;
import org.mkh.framework.web.rest.errors.InvalidPasswordException;
import org.mkh.framework.web.rest.errors.LoginAlreadyUsedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl extends GenericServiceImpl<User, Long> implements UserService {

    private final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Transactional
    public Optional<User> activateRegistration(String key) {
        log.debug("Activating user for activation key {}", key);
        return userRepository.findOneByActivationKey(key)
            .map(user -> {
                user.setEnabled(true);
                user.setActivationKey(null);
                log.debug("Activated user: {}", user);
                return user;
            });

    }

    @Transactional
    public Optional<User> completePasswordReset(String newPassword, String key) {
        log.debug("Reset user password for reset key {}", key);
        return userRepository.findOneByResetKey(key)
            .filter(user -> user.getResetDate().isAfter(Instant.now().minusSeconds(86400)))
            .map(user -> {
                user.setPassword(passwordEncoder.encode(newPassword));
                user.setResetKey(null);
                user.setResetDate(null);
                return user;
            });
    }

    @Transactional
    public Optional<User> requestPasswordReset(String mail) {
        return userRepository.findOneByEmailIgnoreCase(mail)
            .filter(User::isEnabled)
            .map(user -> {
                user.setResetKey(RandomUtil.generateResetKey());
                user.setResetDate(Instant.now());
                return user;
            });
    }

    @Transactional
    public User registerUser(UserDTO userDTO, String password) {
        userRepository.findOneByUsername(userDTO.getUsername().toLowerCase())
            .ifPresent(existingUser -> {
                boolean removed = removeNonActivatedUser(existingUser);
                if (!removed) {
                    throw new LoginAlreadyUsedException();
                }
            });
        userRepository.findOneByEmailIgnoreCase(userDTO.getEmail())
            .ifPresent(existingUser -> {
                boolean removed = removeNonActivatedUser(existingUser);
                if (!removed) {
                    throw new EmailAlreadyUsedException();
                }
            });
        User newUser = new User();
        String encryptedPassword = passwordEncoder.encode(password);
        newUser.setUsername(userDTO.getUsername().toLowerCase());
        // new user gets initially a generated password
        newUser.setPassword(encryptedPassword);
        newUser.setFirstName(userDTO.getFirstName());
        newUser.setLastName(userDTO.getLastName());
        newUser.setEmail(userDTO.getEmail().toLowerCase());
        newUser.setImageUrl(userDTO.getImageUrl());
        newUser.setLangKey(userDTO.getLangKey());
        // new user is not active
        newUser.setEnabled(false);
        // new user gets registration key
        newUser.setActivationKey(RandomUtil.generateActivationKey());
        Set<Authority> authorities = new HashSet<>();
        authorityRepository.findByName(AuthoritiesConstants.USER).ifPresent(authorities::add);
        newUser.setAuthorities(authorities);
        userRepository.save(newUser);
        log.debug("Created Information for User: {}", newUser);
        return newUser;
    }

    @Transactional
    protected boolean removeNonActivatedUser(User existingUser) {
        if (existingUser.isEnabled()) {
            return false;
        }
        userRepository.delete(existingUser);
        userRepository.flush();
        return true;
    }

    @Transactional
    public User createUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername().toLowerCase());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setEmail(userDTO.getEmail().toLowerCase());
        user.setImageUrl(userDTO.getImageUrl());
        if (userDTO.getLangKey() == null) {
            user.setLangKey(Constants.DEFAULT_LANGUAGE); // default language
        } else {
            user.setLangKey(userDTO.getLangKey());
        }
        String encryptedPassword = passwordEncoder.encode(RandomUtil.generatePassword());
        user.setPassword(encryptedPassword);
        user.setResetKey(RandomUtil.generateResetKey());
        user.setResetDate(Instant.now());
        user.setEnabled(userDTO.isEnabled());
        userRepository.save(user);
        return user;
    }

    @Transactional
    public void updateUser(String firstName, String lastName, String email, String langKey, String imageUrl) {
        SecurityUtils.getCurrentUserName()
            .flatMap(userRepository::findOneByUsername)
            .ifPresent(user -> {
                user.setFirstName(firstName);
                user.setLastName(lastName);
                user.setEmail(email.toLowerCase());
                user.setLangKey(langKey);
                user.setImageUrl(imageUrl);
                log.debug("Changed Information for User: {}", user);
            });
    }

    /**
     * Update all information for a specific user, and return the modified user.
     *
     * @param userDTO user to update
     * @return updated user
     */
    @Transactional
    public Optional<UserDTO> updateUser(UserDTO userDTO) {
        return Optional.of(userRepository
            .findById(userDTO.getId()))
            .filter(Optional::isPresent)
            .map(Optional::get)
            .map(user -> {
                user.setUsername(userDTO.getUsername().toLowerCase());
                user.setFirstName(userDTO.getFirstName());
                user.setLastName(userDTO.getLastName());
                user.setEmail(userDTO.getEmail().toLowerCase());
                user.setImageUrl(userDTO.getImageUrl());
                user.setEnabled(userDTO.isEnabled());
                user.setLangKey(userDTO.getLangKey());
//                Set<Authority> managedAuthorities = user.getAuthorities();
//                managedAuthorities.clear();
//                userDTO.getAuthorities().stream()
//                    .map(authorityRepository::findByName)
//                    .filter(Optional::isPresent)
//                    .map(Optional::get)
//                    .forEach(managedAuthorities::add);
//                log.debug("Changed Information for User: {}", user);
                return user;
            })
            .map(UserDTO::new);
    }

    @Transactional
    public Optional<UserDTO> updateUsersGroups(UserDTO userDTO) {
        return Optional.of(findById(userDTO.getId())
            .map(user -> {
                user.getGroups().clear();
                user.setGroups(userDTO.getGroups());
                return user;
            }).get()).map(UserDTO::new);

    }

    @Transactional
    public void deleteUser(String username) {
        userRepository.findOneByUsername(username).ifPresent(user -> {
            userRepository.delete(user);
            log.debug("Deleted User: {}", user);
        });
    }

    @Transactional
    public void deleteUser(Long id) {
        findById(id).ifPresent(user -> {
            userRepository.delete(user);
            log.debug("Deleted User: {}", user);
        });
    }

    @Transactional
    public void changePassword(String currentClearTextPassword, String newPassword) {
        SecurityUtils.getCurrentUserName()
            .flatMap(userRepository::findOneByUsername)
            .ifPresent(user -> {
                String currentEncryptedPassword = user.getPassword();
                if (!passwordEncoder.matches(currentClearTextPassword, currentEncryptedPassword)) {
                    throw new InvalidPasswordException();
                }
                String encryptedPassword = passwordEncoder.encode(newPassword);
                user.setPassword(encryptedPassword);
                log.debug("Changed password for User: {}", user);
            });
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> getAllGrid(Pageable pageable) {
        Page<User> users = userRepository.findAllByUsernameNot(pageable, Constants.ANONYMOUS_USER);
        return users.map(UserDTO::new);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthoritiesByUsername(String username) {
        return userRepository.findOneByUsername(username).map(user -> {
            user.getGroups()
                .stream()
                .forEach(g -> g.getAuthorities()
                    .stream()
                    .forEach(authority -> user.getAuthorities().add(Authority.builder().name("ROLE_" + authority.getName()).build())));
            return user;
        });
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities(Long id) {
        return userRepository.findOneWithAuthoritiesById(id).map(user -> {
            user.getGroups()
                .stream()
                .forEach(g -> g.getAuthorities()
                    .stream()
                    .forEach(authority -> user.getAuthorities().add(Authority.builder().name("ROLE_" + authority.getName()).build())));
            return user;
        });
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithGroups(Long id) {
        return userRepository.findOneWithGroupsById(id);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities() {
        return SecurityUtils.getCurrentUser().flatMap(user -> {
            Optional<User> optionalUser = findById(user.getId());
            optionalUser.get().setAuthorities(user.getAuthorities());
            return optionalUser;
        });
    }

    @Transactional(readOnly = true)
    public List<String> getAuthorities() {
        return authorityRepository.findAll().stream().map(Authority::getName).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<Authority> findAuthoritiesWereAccessed(boolean enabled, Long userId, Long parentId) {
        return userRepository.findAuthoritiesWereAccessed(userId, enabled, parentId);
    }

    @Override
    @Transactional
    public User addGroup(Long userId, Long groupId) {
        return findById(userId)
            .map(user -> {
                user.getGroups().add(Group.builder().id(groupId).build());
                return user;
            }).get();
    }
}
