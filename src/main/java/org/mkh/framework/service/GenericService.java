package org.mkh.framework.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface GenericService<T, ID extends Serializable> {

    Optional<T> findById(ID entityId);

    List<T> findAll();

    List<T> findAll(Pageable pageable);

    Page<T> findAllGrid(Pageable pageable);

    @Transactional
    T save(T entity);

    @Transactional
    void saveAll(Set<T> entities);

    @Transactional
    boolean delete(T entity);

    @Transactional
    boolean delete(Set<T> entities);

    @Transactional
    boolean deleteById(ID entityId);
}
