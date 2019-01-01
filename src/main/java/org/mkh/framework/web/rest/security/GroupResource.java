package org.mkh.framework.web.rest.security;

import org.mkh.framework.domain.security.Authority;
import org.mkh.framework.domain.security.Group;
import org.mkh.framework.repository.security.GroupRepository;
import org.mkh.framework.service.dto.security.AuthorityDTO;
import org.mkh.framework.service.dto.security.GroupDTO;
import org.mkh.framework.service.impl.security.GroupServiceImpl;
import org.mkh.framework.service.mapper.AuthorityMapper;
import org.mkh.framework.web.rest.errors.BadRequestAlertException;
import org.mkh.framework.web.rest.util.HeaderUtil;
import org.mkh.framework.web.rest.util.PaginationUtil;
import org.mkh.framework.web.rest.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Group.
 */
@RestController
@RequestMapping("/api/groups")
public class GroupResource {

    private final Logger log = LoggerFactory.getLogger(GroupResource.class);

    private static final String ENTITY_NAME = "group";

    private final GroupRepository groupRepository;

    private final GroupServiceImpl groupService;

    public GroupResource(GroupServiceImpl groupService, GroupRepository groupRepository) {
        this.groupService = groupService;
        this.groupRepository = groupRepository;
    }

    /**
     * POST  /groups : Create a new group.
     *
     * @param group the group to create
     * @return the ResponseEntity with status 201 (Created) and with body the new group, or with status 400 (Bad Request) if the group has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("")
    public ResponseEntity<Group> createGroup(@Valid @RequestBody Group group) throws URISyntaxException {
        log.debug("REST request to save Group : {}", group);
        if (group.getId() != null) {
            throw new BadRequestAlertException("A new group cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Group result = groupRepository.save(group);
        return ResponseEntity.created(new URI("/api/groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /groups : Updates an existing group.
     *
     * @param groupDTO the group to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated group,
     * or with status 400 (Bad Request) if the group is not valid,
     * or with status 500 (Internal Server Error) if the group couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("")
    public ResponseEntity<Group> updateGroup(@Valid @RequestBody GroupDTO groupDTO) throws URISyntaxException {
        log.debug("REST request to update Group : {}", groupDTO);
        if (groupDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "id is null");
        }
        Group result = groupService.update(groupDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, groupDTO.getId().toString()))
            .body(result);
    }

    @PutMapping("/groupAuthorities")
    public ResponseEntity<Void> updateAuthorities(@RequestBody GroupDTO group) throws URISyntaxException {
        log.debug("REST request to update Group Authorities: {}", group);
        if (group.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "id is null");
        }
        groupService.updateAuthorities(group);

        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, group.getId().toString())).build();

    }

    @DeleteMapping("/groupUsers/{groupId}/{userId}")
    public ResponseEntity<Void> updateUsers(@PathVariable Long groupId,
                                            @PathVariable Long userId) {

        log.debug("REST request to update Group Users: {}", groupId);
        groupService.removeUserGroup(groupId,userId);

        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, groupId+"")).build();
    }

    /**
     * GET  /groups : get all the groups.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of groups in body
     */
    @GetMapping("")

    public ResponseEntity<List<Group>> getAllGroups(Pageable pageable) {
        final Page<Group> page = groupRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/groups");
        log.debug("REST request to get all Groups");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /groups/:id : get the "id" group.
     *
     * @param id the id of the group to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the group, or with status 404 (Not Found)
     */
    @GetMapping("/{id}")

    public ResponseEntity<Group> getGroup(@PathVariable Long id) {
        log.debug("REST request to get Group : {}", id);
        Optional<Group> group = groupRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(group);
    }

    @GetMapping("/withAuthorities/{id}")
    public ResponseEntity<GroupDTO> getGroupWithAuthorities(@PathVariable Long id) {
        log.debug("REST request to get Group : {}", id);
        return ResponseUtil.wrapOrNotFound(groupService.getGroupWithAuthorities(id));
    }

    @GetMapping("/withUsers/{id}")
    public ResponseEntity<GroupDTO> getGroupWithUsers(@PathVariable Long id) {
        log.debug("REST request to get Group : {}", id);
        return ResponseUtil.wrapOrNotFound(groupService.getGroupWithUsers(id));
    }

    /**
     * DELETE  /groups/:id : delete the "id" group.
     *
     * @param id the id of the group to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/{id}")

    public ResponseEntity<Void> deleteGroup(@PathVariable Long id) {
        log.debug("REST request to delete Group : {}", id);

        groupRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * @return a string list of the all of the roles
     */
    @GetMapping("/authorities")
    public List<String> getAuthorities() {
        return groupService.getAuthorities();
    }

    @GetMapping("/all")
    public List<Group> getAllGroups() {
        return groupService.findAll();
    }
}
