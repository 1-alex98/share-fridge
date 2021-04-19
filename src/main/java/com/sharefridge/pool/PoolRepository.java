package com.sharefridge.pool;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface PoolRepository extends CrudRepository<Pool, String> {
    @Override
    @PreAuthorize("hasRole('ROLE_USER')")
    Pool save(Pool entity);

    @PreAuthorize("hasRole('ROLE_USER')")
    @PostFilter("hasPermission(filterObject, 'null')")
    @Override
    List<Pool> findAll();

}
