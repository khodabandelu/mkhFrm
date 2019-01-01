package org.mkh.framework.service.core;

import org.mkh.framework.domain.core.File;
import org.mkh.framework.service.GenericService;
import org.mkh.framework.service.dto.core.FileDTO;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface FileService extends GenericService<File, Long> {

    Optional<File> getByCode(String code);

    @Transactional
    Boolean deleteByCode(String code);

    @Transactional
    boolean confirmFile(String code);

    @Transactional
    Optional<FileDTO> upload(File file);
}
