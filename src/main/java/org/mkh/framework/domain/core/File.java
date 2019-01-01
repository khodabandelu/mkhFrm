package org.mkh.framework.domain.core;

import lombok.*;
import org.mkh.framework.domain.AbstractEntity;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "mkh_file")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class File extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "attachment", nullable = false)
    private byte[] attachment;

    @Column(name = "name")
    private String name;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "accept_date")
    private Instant confirmedDate;

    public File(byte[] attachment, String name, String type) {
        super();
        this.attachment = attachment;
        this.name = name;
        this.type = type;
    }
}
