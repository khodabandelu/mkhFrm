package org.mkh.framework.domain.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.mkh.framework.domain.AbstractEntity;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Entity
@Table(name = "mkh_authority", uniqueConstraints = @UniqueConstraint(columnNames = {"name"}))
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Authority extends AbstractEntity implements GrantedAuthority {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 50)
    @Column(length = 50)
    private String name;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "src")
    private String src;

    @Column(name = "sort_order", nullable = false)
    private int sortOrder;

    @Column(nullable = false)
    private boolean enabled = false;

    @Column(name = "icon")
    private String icon;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Authority parent;

    @OneToMany(mappedBy = "parent")
    @JsonIgnore
    private Set<Authority> children;

    @JsonIgnore
    @ManyToMany(mappedBy = "authorities")
    private Set<Group> groups;

    public Authority(String name) {
        this.name = name;
    }

    @Override
    public String getAuthority() {
        return this.name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Authority authority = (Authority) o;

        return !(name != null ? !name.equals(authority.name) : authority.name != null);
    }

    @Override
    public int hashCode() {
        return name != null ? name.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Authority{" +
            "name='" + name + '\'' +
            "}";
    }
}
