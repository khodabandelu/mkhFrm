package org.mkh.framework.service.dto.security;

import lombok.*;
import org.mkh.framework.domain.security.Authority;
import org.mkh.framework.domain.security.Group;
import org.mkh.framework.domain.security.User;

import javax.validation.constraints.Size;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GroupDTO {

    private Long id;

    @Size(max = 50)
    private String name;

    private Set<User> users;

    private Set<Authority> authorities;

    public GroupDTO(Group group) {
        this.id = group.getId();
        this.name = group.getName();
        this.authorities = group.getAuthorities();
        this.users=group.getUsers();
    }

    @Override
    public String toString() {
        return "GroupDTO{" +
            "id='" + id + '\'' +
            ", name='" + name + '\'' +
            ", authorities=" + authorities +
            "}";
    }
}
