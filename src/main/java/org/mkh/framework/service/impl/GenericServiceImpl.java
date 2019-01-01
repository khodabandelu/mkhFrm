package org.mkh.framework.service.impl;

import org.mkh.framework.repository.GenericRepository;
import org.mkh.framework.service.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public class GenericServiceImpl<T, ID extends Serializable> implements GenericService<T, ID> {

    @Autowired
    private GenericRepository<T, ID> repository;

    @Override
    public Optional<T> findById(ID entityId) {
        return repository.findById(entityId);
    }

    @Override
    public List<T> findAll() {
        return repository.findAll();
    }

    @Override
    public List<T> findAll(Pageable pageable) {
        return repository.findAll(pageable).getContent();
    }

    @Override
    public Page<T> findAllGrid(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Override
    @Transactional
    public T save(T entity) {
        return repository.save(entity);
    }

    @Override
    @Transactional
    public void saveAll(Set<T> entities) {
        repository.saveAll(entities);
    }

    @Override
    @Transactional
    public boolean delete(T entity) {
        repository.delete(entity);
        return true;
    }

    @Override
    @Transactional
    public boolean delete(Set<T> entities) {
        repository.deleteAll(entities);
        return true;
    }

    @Override
    @Transactional
    public boolean deleteById(ID entityId) {
        repository.deleteById(entityId);
        return true;
    }

}
