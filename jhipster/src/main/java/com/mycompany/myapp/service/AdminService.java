package com.mycompany.myapp.service;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.mycompany.myapp.domain.Admin;
import com.mycompany.myapp.repository.AdminRepository;
import com.mycompany.myapp.repository.search.AdminSearchRepository;
import com.mycompany.myapp.service.dto.AdminDTO;
import com.mycompany.myapp.service.mapper.AdminMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Admin}.
 */
@Service
@Transactional
public class AdminService {

    private final Logger log = LoggerFactory.getLogger(AdminService.class);

    private final AdminRepository adminRepository;

    private final AdminMapper adminMapper;

    private final AdminSearchRepository adminSearchRepository;

    public AdminService(AdminRepository adminRepository, AdminMapper adminMapper, AdminSearchRepository adminSearchRepository) {
        this.adminRepository = adminRepository;
        this.adminMapper = adminMapper;
        this.adminSearchRepository = adminSearchRepository;
    }

    /**
     * Save a admin.
     *
     * @param adminDTO the entity to save.
     * @return the persisted entity.
     */
    public AdminDTO save(AdminDTO adminDTO) {
        log.debug("Request to save Admin : {}", adminDTO);
        Admin admin = adminMapper.toEntity(adminDTO);
        admin = adminRepository.save(admin);
        AdminDTO result = adminMapper.toDto(admin);
        adminSearchRepository.index(admin);
        return result;
    }

    /**
     * Update a admin.
     *
     * @param adminDTO the entity to save.
     * @return the persisted entity.
     */
    public AdminDTO update(AdminDTO adminDTO) {
        log.debug("Request to update Admin : {}", adminDTO);
        Admin admin = adminMapper.toEntity(adminDTO);
        admin = adminRepository.save(admin);
        AdminDTO result = adminMapper.toDto(admin);
        adminSearchRepository.index(admin);
        return result;
    }

    /**
     * Partially update a admin.
     *
     * @param adminDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<AdminDTO> partialUpdate(AdminDTO adminDTO) {
        log.debug("Request to partially update Admin : {}", adminDTO);

        return adminRepository
            .findById(adminDTO.getId())
            .map(existingAdmin -> {
                adminMapper.partialUpdate(existingAdmin, adminDTO);

                return existingAdmin;
            })
            .map(adminRepository::save)
            .map(savedAdmin -> {
                adminSearchRepository.save(savedAdmin);

                return savedAdmin;
            })
            .map(adminMapper::toDto);
    }

    /**
     * Get all the admins.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AdminDTO> findAll() {
        log.debug("Request to get all Admins");
        return adminRepository.findAll().stream().map(adminMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one admin by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AdminDTO> findOne(Long id) {
        log.debug("Request to get Admin : {}", id);
        return adminRepository.findById(id).map(adminMapper::toDto);
    }

    /**
     * Delete the admin by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Admin : {}", id);
        adminRepository.deleteById(id);
        adminSearchRepository.deleteById(id);
    }

    /**
     * Search for the admin corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AdminDTO> search(String query) {
        log.debug("Request to search Admins for query {}", query);
        return StreamSupport
            .stream(adminSearchRepository.search(query).spliterator(), false)
            .map(adminMapper::toDto)
            .collect(Collectors.toList());
    }
}
