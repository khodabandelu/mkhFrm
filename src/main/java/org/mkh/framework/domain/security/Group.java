package org.mkh.framework.domain.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.mkh.framework.domain.AbstractEntity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A Group.
 */
@Entity
@Table(name = "mkh_group")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
//@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Group extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "groups",fetch = FetchType.LAZY)
    @JsonIgnore
    @BatchSize(size = 20)
    private Set<User> users = new HashSet<User>(0);

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "mkh_group_authority",
        joinColumns = {@JoinColumn(name = "group_id", referencedColumnName = "id", nullable = false, updatable = false)},
        inverseJoinColumns = {@JoinColumn(name = "authority_id", referencedColumnName = "id", nullable = false, updatable = false)})
    @JsonIgnore
    private Set<Authority> authorities = new HashSet<Authority>(0);

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Group group = (Group) o;
        if (group.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), group.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Group{" +
            "id=" + getId() +
            ", name='" + getName() +
            "}";
    }
}
