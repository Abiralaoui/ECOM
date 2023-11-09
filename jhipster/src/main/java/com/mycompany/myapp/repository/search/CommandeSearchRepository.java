package com.mycompany.myapp.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.mycompany.myapp.domain.Commande;
import com.mycompany.myapp.repository.CommandeRepository;
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
 * Spring Data Elasticsearch repository for the {@link Commande} entity.
 */
public interface CommandeSearchRepository extends ElasticsearchRepository<Commande, Long>, CommandeSearchRepositoryInternal {}

interface CommandeSearchRepositoryInternal {
    Stream<Commande> search(String query);

    Stream<Commande> search(Query query);

    void index(Commande entity);
}

class CommandeSearchRepositoryInternalImpl implements CommandeSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;
    private final CommandeRepository repository;

    CommandeSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate, CommandeRepository repository) {
        this.elasticsearchTemplate = elasticsearchTemplate;
        this.repository = repository;
    }

    @Override
    public Stream<Commande> search(String query) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        return search(nativeSearchQuery);
    }

    @Override
    public Stream<Commande> search(Query query) {
        return elasticsearchTemplate.search(query, Commande.class).map(SearchHit::getContent).stream();
    }

    @Override
    public void index(Commande entity) {
        repository.findById(entity.getId()).ifPresent(elasticsearchTemplate::save);
    }
}
