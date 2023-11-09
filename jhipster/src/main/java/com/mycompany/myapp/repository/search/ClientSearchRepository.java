package com.mycompany.myapp.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.mycompany.myapp.domain.Client;
import com.mycompany.myapp.repository.ClientRepository;
import java.util.stream.Stream;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.query.NativeSearchQuery;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/**
 * Spring Data Elasticsearch repository for the {@link Client} entity.
 */
public interface ClientSearchRepository extends ElasticsearchRepository<Client, Long>, ClientSearchRepositoryInternal {}

interface ClientSearchRepositoryInternal {
    Stream<Client> search(String query);

    Stream<Client> search(Query query);

    void index(Client entity);
}

class ClientSearchRepositoryInternalImpl implements ClientSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;
    private final ClientRepository repository;

    ClientSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate, ClientRepository repository) {
        this.elasticsearchTemplate = elasticsearchTemplate;
        this.repository = repository;
    }

    @Override
    public Stream<Client> search(String query) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        return search(nativeSearchQuery);
    }

    @Override
    public Stream<Client> search(Query query) {
        return elasticsearchTemplate.search(query, Client.class).map(SearchHit::getContent).stream();
    }

    @Override
    public void index(Client entity) {
        repository.findOneWithEagerRelationships(entity.getId()).ifPresent(elasticsearchTemplate::save);
    }
}
