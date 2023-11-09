package com.mycompany.myapp.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.mycompany.myapp.domain.Produit;
import com.mycompany.myapp.repository.ProduitRepository;
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
 * Spring Data Elasticsearch repository for the {@link Produit} entity.
 */
public interface ProduitSearchRepository extends ElasticsearchRepository<Produit, Long>, ProduitSearchRepositoryInternal {}

interface ProduitSearchRepositoryInternal {
    Stream<Produit> search(String query);

    Stream<Produit> search(Query query);

    void index(Produit entity);
}

class ProduitSearchRepositoryInternalImpl implements ProduitSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;
    private final ProduitRepository repository;

    ProduitSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate, ProduitRepository repository) {
        this.elasticsearchTemplate = elasticsearchTemplate;
        this.repository = repository;
    }

    @Override
    public Stream<Produit> search(String query) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        return search(nativeSearchQuery);
    }

    @Override
    public Stream<Produit> search(Query query) {
        return elasticsearchTemplate.search(query, Produit.class).map(SearchHit::getContent).stream();
    }

    @Override
    public void index(Produit entity) {
        repository.findOneWithEagerRelationships(entity.getId()).ifPresent(elasticsearchTemplate::save);
    }
}
