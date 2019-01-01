package org.mkh.framework.service.dto.core;

import lombok.*;
import org.mkh.framework.domain.core.File;
import org.mkh.framework.service.util.StringUtility;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FileDTO {

    private String code;
    private String name;

    public FileDTO(File file) {
        this.code = file.getCode();
        this.name = StringUtility.toUTF8(file.getName());
    }

}
