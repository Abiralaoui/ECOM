package com.mycompany.myapp.service;

import static org.elasticsearch.index.query.QueryBuilders.*;

import com.mycompany.myapp.domain.Client;
import com.mycompany.myapp.repository.ClientRepository;
import com.mycompany.myapp.repository.search.ClientSearchRepository;
import com.mycompany.myapp.service.dto.ClientDTO;
import com.mycompany.myapp.service.mapper.ClientMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Client}.
 */
@Service
@Transactional
public class ClientService {

    private final Logger log = LoggerFactory.getLogger(ClientService.class);

    private final ClientRepository clientRepository;

    private final ClientMapper clientMapper;

    private final ClientSearchRepository clientSearchRepository;

    public ClientService(ClientRepository clientRepository, ClientMapper clientMapper, ClientSearchRepository clientSearchRepository) {
        this.clientRepository = clientRepository;
        this.clientMapper = clientMapper;
        this.clientSearchRepository = clientSearchRepository;
    }

    /**
     * Save a client.
     *
     * @param clientDTO the entity to save.
     * @return the persisted entity.
     */
    public ClientDTO save(ClientDTO clientDTO) {
        log.debug("Request to save Client : {}", clientDTO);
        Client client = clientMapper.toEntity(clientDTO);
        client = clientRepository.save(client);
        ClientDTO result = clientMapper.toDto(client);
        clientSearchRepository.index(client);
        return result;
    }

    /**
     * Update a client.
     *
     * @param clientDTO the entity to save.
     * @return the persisted entity.
     */
    public ClientDTO update(ClientDTO clientDTO) {
        log.debug("Request to update Client : {}", clientDTO);
        Client client = clientMapper.toEntity(clientDTO);
        client = clientRepository.save(client);
        ClientDTO result = clientMapper.toDto(client);
        clientSearchRepository.index(client);
        return result;
    }

    /**
     * Partially update a client.
     *
     * @param clientDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<ClientDTO> partialUpdate(ClientDTO clientDTO) {
        log.debug("Request to partially update Client : {}", clientDTO);

        return clientRepository
            .findById(clientDTO.getId())
            .map(existingClient -> {
                clientMapper.partialUpdate(existingClient, clientDTO);

                return existingClient;
            })
            .map(clientRepository::save)
            .map(savedClient -> {
                clientSearchRepository.save(savedClient);

                return savedClient;
            })
            .map(clientMapper::toDto);
    }

    /**
     * Get all the clients.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ClientDTO> findAll() {
        log.debug("Request to get all Clients");
        return clientRepository.findAll().stream().map(clientMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get all the clients with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    public Page<ClientDTO> findAllWithEagerRelationships(Pageable pageable) {
        return clientRepository.findAllWithEagerRelationships(pageable).map(clientMapper::toDto);
    }

    /**
     * Get one client by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ClientDTO> findOne(Long id) {
        log.debug("Request to get Client : {}", id);
        return clientRepository.findOneWithEagerRelationships(id).map(clientMapper::toDto);
    }

    /**
     * Delete the client by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Client : {}", id);
        clientRepository.deleteById(id);
        clientSearchRepository.deleteById(id);
    }

    /**
     * Search for the client corresponding to the query.
     *
     * @param query the query of the search.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ClientDTO> search(String query) {
        log.debug("Request to search Clients for query {}", query);
        return StreamSupport
            .stream(clientSearchRepository.search(query).spliterator(), false)
            .map(clientMapper::toDto)
            .collect(Collectors.toList());
    }
}
