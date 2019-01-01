package org.mkh.framework.repository.core;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.mkh.framework.domain.core.File;
import org.mkh.framework.repository.GenericRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface FileRepository extends GenericRepository<File, Long> {


     Optional<File> findOneByCode(String code);

     void deleteByCode(String code);

}
