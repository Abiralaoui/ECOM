package com.mycompany.myapp.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.mycompany.myapp.domain.LigneCommande;
import com.mycompany.myapp.repository.LigneCommandeRepository;
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
 * Spring Data Elasticsearch repository for the {@link LigneCommande} entity.
 */
public interface LigneCommandeSearchRepository
    extends ElasticsearchRepository<LigneCommande, Long>, LigneCommandeSearchRepositoryInternal {}

interface LigneCommandeSearchRepositoryInternal {
    Stream<LigneCommande> search(String query);

    Stream<LigneCommande> search(Query query);

    void index(LigneCommande entity);
}

class LigneCommandeSearchRepositoryInternalImpl implements LigneCommandeSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;
    private final LigneCommandeRepository repository;

    LigneCommandeSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate, LigneCommandeRepository repository) {
        this.elasticsearchTemplate = elasticsearchTemplate;
        this.repository = repository;
    }

    @Override
    public Stream<LigneCommande> search(String query) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        return search(nativeSearchQuery);
    }

    @Override
    public Stream<LigneCommande> search(Query query) {
        return elasticsearchTemplate.search(query, LigneCommande.class).map(SearchHit::getContent).stream();
    }

    @Override
    public void index(LigneCommande entity) {
        repository.findById(entity.getId()).ifPresent(elasticsearchTemplate::save);
    }
}
