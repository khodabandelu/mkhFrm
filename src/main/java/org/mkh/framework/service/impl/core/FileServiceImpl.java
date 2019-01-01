package org.mkh.framework.service.impl.core;

import org.apache.commons.lang3.RandomStringUtils;
import org.mkh.framework.domain.core.File;
import org.mkh.framework.repository.core.FileRepository;
import org.mkh.framework.service.core.FileService;
import org.mkh.framework.service.dto.core.FileDTO;
import org.mkh.framework.service.impl.GenericServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;

@Service
public class FileServiceImpl extends GenericServiceImpl<File, Long> implements FileService {

    private final Logger log = LoggerFactory.getLogger(FileServiceImpl.class);

    @Autowired
    private FileRepository fileRepository;

    @Override
    public Optional<File> getByCode(String code) {
        return fileRepository.findOneByCode(code);
    }

    @Override
    @Transactional
    public Boolean deleteByCode(String code) {
        try {
            fileRepository.deleteByCode(code);
            return true;
        } catch (Exception e) {
            return false;
        }
    }


    @Override
    @Transactional
    public boolean confirmFile(String code) {
        fileRepository.findOneByCode(code)
            .map(file -> {
                file.setConfirmedDate(Instant.now());
                return true;
            });
        return false;
    }

    @Override
    @Transactional
    public Optional<FileDTO> upload(File file) {
        if (file.getCode() == null) {
            String generatedFileCode = Instant.now().toString() + RandomStringUtils.randomNumeric(10);
            file.setCode(generatedFileCode);
            return Optional.of(save(file)).map(FileDTO::new);
        } else {
            return fileRepository.findOneByCode(file.getCode())
                .map(f -> {
                    f.setType(file.getType());
                    f.setAttachment(file.getAttachment());
                    f.setName(file.getName());
                    return f;
                }).map(FileDTO::new);
        }
    }
}
