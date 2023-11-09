package com.mycompany.myapp.service;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.mycompany.myapp.domain.CarteBancaire;
import com.mycompany.myapp.repository.CarteBancaireRepository;
import com.mycompany.myapp.repository.search.CarteBancaireSearchRepository;
import com.mycompany.myapp.service.dto.CarteBancaireDTO;
import com.mycompany.myapp.service.mapper.CarteBancaireMapper;
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
 * Service Implementation for managing {@link CarteBancaire}.
 */
@Service
@Transactional
public class CarteBancaireService {

    private final Logger log = LoggerFactory.getLogger(CarteBancaireService.class);

    private final CarteBancaireRepository carteBancaireRepository;

    private final CarteBancaireMapper carteBancaireMapper;

    private final CarteBancaireSearchRepository carteBancaireSearchRepository;

    public CarteBancaireService(
        CarteBancaireRepository carteBancaireRepository,
        CarteBancaireMapper carteBancaireMapper,
        CarteBancaireSearchRepository carteBancaireSearchRepository
    ) {
        this.carteBancaireRepository = carteBancaireRepository;
        this.carteBancaireMapper = carteBancaireMapper;
        this.carteBancaireSearchRepository = carteBancaireSearchRepository;
    }

    /**
     * Save a carteBancaire.
     *
     * @param carteBancaireDTO the entity to save.
     * @return the persisted entity.
     */
    public CarteBancaireDTO save(CarteBancaireDTO carteBancaireDTO) {
        log.debug("Request to save CarteBancaire : {}", carteBancaireDTO);
        CarteBancaire carteBancaire = carteBancaireMapper.toEntity(carteBancaireDTO);
        carteBancaire = carteBancaireRepository.save(carteBancaire);
        CarteBancaireDTO result = carteBancaireMapper.toDto(carteBancaire);
        carteBancaireSearchRepository.index(carteBancaire);
        return result;
    }

    /**
     * Update a carteBancaire.
     *
     * @param carteBancaireDTO the entity to save.
     * @return the persisted entity.
     */
    public CarteBancaireDTO update(CarteBancaireDTO carteBancaireDTO) {
        log.debug("Request to update CarteBancaire : {}", carteBancaireDTO);
        CarteBancaire carteBancaire = carteBancaireMapper.toEntity(carteBancaireDTO);
        carteBancaire = carteBancaireRepository.save(carteBancaire);
        CarteBancaireDTO result = carteBancaireMapper.toDto(carteBancaire);
        carteBancaireSearchRepository.index(carteBancaire);
        return result;
    }

    /**
     * Partially update a carteBancaire.
     *
     * @param carteBancaireDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<CarteBancaireDTO> partialUpdate(CarteBancaireDTO carteBancaireDTO) {
        log.debug("Request to partially update CarteBancaire : {}", carteBancaireDTO);

        return carteBancaireRepository
            .findById(carteBancaireDTO.getId())
            .map(existingCarteBancaire -> {
                carteBancaireMapper.partialUpdate(existingCarteBancaire, carteBancaireDTO);

                return existingCarteBancaire;
            })
            .map(carteBancaireRepository::save)
            .map(savedCarteBancaire -> {
                carteBancaireSearchRepository.save(savedCarteBancaire);

                return savedCarteBancaire;
            })
            .map(carteBancaireMapper::toDto);
    }

    /**
     * Get all the carteBancaires.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CarteBancaireDTO> findAll() {
        log.debug("Request to get all CarteBancaires");
        return carteBancaireRepository.findAll().stream().map(carteBancaireMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one carteBancaire by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<CarteBancaireDTO> findOne(Long id) {
        log.debug("Request to get CarteBancaire : {}", id);
        return carteBancaireRepository.findById(id).map(carteBancaireMapper::toDto);
    }

    /**
     * Delete the carteBancaire by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete CarteBancaire : {}", id);
        carteBancaireRepository.deleteById(id);
        carteBancaireSearchRepository.deleteById(id);
    }

    /**
     * Search for the carteBancaire corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<CarteBancaireDTO> search(String query) {
        log.debug("Request to search CarteBancaires for query {}", query);
        return StreamSupport
            .stream(carteBancaireSearchRepository.search(query).spliterator(), false)
            .map(carteBancaireMapper::toDto)
            .collect(Collectors.toList());
    }
}
