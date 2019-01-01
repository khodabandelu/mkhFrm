package org.mkh.framework.web.rest.core;

import org.mkh.framework.domain.core.File;
import org.mkh.framework.service.core.FileService;
import org.mkh.framework.service.dto.core.FileDTO;
import org.mkh.framework.service.dto.security.UserDTO;
import org.mkh.framework.web.rest.security.UserResource;
import org.mkh.framework.web.rest.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/files")
public class FileResource {
    private final Logger log = LoggerFactory.getLogger(UserResource.class);

    @Autowired
    private FileService fileService;


    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<FileDTO> upload(@RequestParam("file") MultipartFile file) throws IOException {

        File newFile = File.builder()
            .attachment(file.getBytes())
            .name(file.getOriginalFilename())
            .type(file.getContentType())
            .build();

        return ResponseUtil.wrapOrNotFound(fileService.upload(newFile));
    }

    @RequestMapping(value = "/thumbnails/{fileCode}", method = RequestMethod.GET)
    @ResponseBody
    public void getThumbnails(@PathVariable String fileCode, HttpServletResponse response) {

    }

    @RequestMapping(value = "/download/{fileCode}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity getFile(@PathVariable String fileCode) {

        Optional<File> oFile = fileService.getByCode(fileCode);
        if (!oFile.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return oFile.map(file -> {
            HttpHeaders header = new HttpHeaders();
            header.add("content-disposition", "attachment; filename=" + file.getName());
            String primaryType, subType;
            try {
                primaryType = file.getType().split("/")[0];
                subType = file.getType().split("/")[1];
                header.setContentType(new MediaType(primaryType, subType));
                return new ResponseEntity<>(file.getAttachment(), header, HttpStatus.OK);
            } catch (IndexOutOfBoundsException | NullPointerException ex) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }).get();
    }

    @RequestMapping(value = "/delete/{fileCode}", method = RequestMethod.DELETE)
    @ResponseBody
    public Boolean delete(@PathVariable String fileCode) {
        return fileService.deleteByCode(fileCode);
    }


}
