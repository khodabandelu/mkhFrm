package org.mkh.framework.service.impl.security;

import org.mkh.framework.domain.security.Authority;
import org.mkh.framework.domain.security.Group;
import org.mkh.framework.domain.security.User;
import org.mkh.framework.repository.security.AuthorityRepository;
import org.mkh.framework.repository.security.GroupRepository;
import org.mkh.framework.repository.security.UserRepository;
import org.mkh.framework.security.SecurityUtils;
import org.mkh.framework.service.dto.security.GroupDTO;
import org.mkh.framework.service.impl.GenericServiceImpl;
import org.mkh.framework.service.security.GroupService;
import org.mkh.framework.service.security.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service class for managing groups.
 */
@Service
public class GroupServiceImpl extends GenericServiceImpl<Group, Long> implements GroupService {

    private final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private  GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private UserService userService;

    @Autowired
    private  AuthorityRepository authorityRepository;


    public List<String> getAuthorities() {
        return authorityRepository.findAll().stream().map(Authority::getName).collect(Collectors.toList());
    }


    public Optional<GroupDTO> getGroupWithAuthorities(Long id){
        return groupRepository.findOneWithAuthoritiesById(id).map(GroupDTO::new);
    }

    public Optional<GroupDTO> getGroupWithUsers(Long id){
        return groupRepository.findOneWithUsersById(id).map(GroupDTO::new);
    }

    @Override
    @Transactional
    public Group create(GroupDTO groupDTO) {
        Group group = Group.builder()
            .name(groupDTO.getName())
            .build();
        Group groupSaved = save(group);
        SecurityUtils.getCurrentUserId().ifPresent(userId -> {
            userService.addGroup(userId, group.getId());
        });
        return groupSaved;
    }

    @Override
    @Transactional
    public Group update(GroupDTO groupDTO) {
        return findById(groupDTO.getId())
            .map(group -> {
                group.setName(groupDTO.getName());
                return group;
            }).get();
    }

    @Override
    @Transactional
    public Group updateAuthorities(GroupDTO groupDTO) {
        return findById(groupDTO.getId())
            .map(group -> {
                group.getAuthorities().clear();
                group.setAuthorities(groupDTO.getAuthorities());
                return group;
            }).get();
    }

    @Override
    @Transactional
    public Group saveAuthorities(Long groupId, Set<Authority> authorities) {
        return findById(groupId)
            .map(group -> {
                group.setAuthorities(authorities);
                return group;
            }).get();
    }

    @Override
    @Transactional
    public Group addUserGroup(Long groupId,  Long userId){
        return findById(groupId).map(group -> {
            group.getUsers().add(User.builder().id(userId).build());
            return group;
        }).get();
    }

    @Override
    @Transactional
    public Group removeUserGroup(Long groupId,  Long userId){
        userRepository.findById(userId).map(user->user.getGroups().removeIf(group->group.getId()==groupId));
        return findById(groupId).map(group -> {
            Set<User> users=group.getUsers();
            users.removeIf(obj->obj.getId()==userId);
            group.setUsers(users);
            return group;
        }).get();
    }

}
