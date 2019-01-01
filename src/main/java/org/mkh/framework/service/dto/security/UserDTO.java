package org.mkh.framework.service.dto.security;

import lombok.*;
import org.mkh.framework.config.Constants;
import org.mkh.framework.domain.security.Group;
import org.mkh.framework.domain.security.User;
import org.springframework.security.core.GrantedAuthority;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * A DTO representing a user, with his authorities.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

    private Long id;

    @NotBlank
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 50)
    private String username;

    @Size(max = 50)
    private String firstName;

    @Size(max = 50)
    private String lastName;

    private String birthDate;

    private String cellphone;

    private Integer visitedCount;

    private Instant lastVisitDate;

    @Email
    private String email;

    @Size(max = 256)
    private String imageUrl;

    private boolean enabled = false;

    @Size(min = 2, max = 6)
    private String langKey;

    private User createdBy;

    private Instant createdDate;

    private User lastModifiedBy;

    private Instant lastModifiedDate;

    private Set<String> authorities;

    private Set<Group> groups;

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.enabled = user.isEnabled();
        this.imageUrl = user.getImageUrl();
        this.langKey = user.getLangKey();
//        this.createdBy = user.getCreatedBy();
//        this.createdDate = user.getCreatedDate();
//        this.lastModifiedBy = user.getLastModifiedBy();
//        this.lastModifiedDate = user.getLastModifiedDate();
        this.authorities = user.getAuthorities().stream()
//            .map(Authority::getName)
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.toSet());
        this.groups=user.getGroups();
    }


    @Override
    public String toString() {
        return "UserDTO{" +
            "username='" + username + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", email='" + email + '\'' +
            ", imageUrl='" + imageUrl + '\'' +
            ", enabled=" + enabled +
            ", langKey='" + langKey + '\'' +
            ", createdBy=" + createdBy +
            ", createdDate=" + createdDate +
            ", lastModifiedBy='" + lastModifiedBy + '\'' +
            ", lastModifiedDate=" + lastModifiedDate +
            ", authorities=" + authorities +
            ", groups=" + groups +
            "}";
    }
}
