package com.mycompany.myapp.service;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.mycompany.myapp.domain.Avis;
import com.mycompany.myapp.repository.AvisRepository;
import com.mycompany.myapp.repository.search.AvisSearchRepository;
import com.mycompany.myapp.service.dto.AvisDTO;
import com.mycompany.myapp.service.mapper.AvisMapper;
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
 * Service Implementation for managing {@link Avis}.
 */
@Service
@Transactional
public class AvisService {

    private final Logger log = LoggerFactory.getLogger(AvisService.class);

    private final AvisRepository avisRepository;

    private final AvisMapper avisMapper;

    private final AvisSearchRepository avisSearchRepository;

    public AvisService(AvisRepository avisRepository, AvisMapper avisMapper, AvisSearchRepository avisSearchRepository) {
        this.avisRepository = avisRepository;
        this.avisMapper = avisMapper;
        this.avisSearchRepository = avisSearchRepository;
    }

    /**
     * Save a avis.
     *
     * @param avisDTO the entity to save.
     * @return the persisted entity.
     */
    public AvisDTO save(AvisDTO avisDTO) {
        log.debug("Request to save Avis : {}", avisDTO);
        Avis avis = avisMapper.toEntity(avisDTO);
        avis = avisRepository.save(avis);
        AvisDTO result = avisMapper.toDto(avis);
        avisSearchRepository.index(avis);
        return result;
    }

    /**
     * Update a avis.
     *
     * @param avisDTO the entity to save.
     * @return the persisted entity.
     */
    public AvisDTO update(AvisDTO avisDTO) {
        log.debug("Request to update Avis : {}", avisDTO);
        Avis avis = avisMapper.toEntity(avisDTO);
        avis = avisRepository.save(avis);
        AvisDTO result = avisMapper.toDto(avis);
        avisSearchRepository.index(avis);
        return result;
    }

    /**
     * Partially update a avis.
     *
     * @param avisDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<AvisDTO> partialUpdate(AvisDTO avisDTO) {
        log.debug("Request to partially update Avis : {}", avisDTO);

        return avisRepository
            .findById(avisDTO.getId())
            .map(existingAvis -> {
                avisMapper.partialUpdate(existingAvis, avisDTO);

                return existingAvis;
            })
            .map(avisRepository::save)
            .map(savedAvis -> {
                avisSearchRepository.save(savedAvis);

                return savedAvis;
            })
            .map(avisMapper::toDto);
    }

    /**
     * Get all the avis.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AvisDTO> findAll() {
        log.debug("Request to get all Avis");
        return avisRepository.findAll().stream().map(avisMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one avis by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<AvisDTO> findOne(Long id) {
        log.debug("Request to get Avis : {}", id);
        return avisRepository.findById(id).map(avisMapper::toDto);
    }

    /**
     * Delete the avis by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Avis : {}", id);
        avisRepository.deleteById(id);
        avisSearchRepository.deleteById(id);
    }

    /**
     * Search for the avis corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AvisDTO> search(String query) {
        log.debug("Request to search Avis for query {}", query);
        return StreamSupport
            .stream(avisSearchRepository.search(query).spliterator(), false)
            .map(avisMapper::toDto)
            .collect(Collectors.toList());
    }
}
