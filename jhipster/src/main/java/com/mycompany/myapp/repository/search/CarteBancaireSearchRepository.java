package com.mycompany.myapp.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.mycompany.myapp.domain.CarteBancaire;
import com.mycompany.myapp.repository.CarteBancaireRepository;
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
 * Spring Data Elasticsearch repository for the {@link CarteBancaire} entity.
 */
public interface CarteBancaireSearchRepository
    extends ElasticsearchRepository<CarteBancaire, Long>, CarteBancaireSearchRepositoryInternal {}

interface CarteBancaireSearchRepositoryInternal {
    Stream<CarteBancaire> search(String query);

    Stream<CarteBancaire> search(Query query);

    void index(CarteBancaire entity);
}

class CarteBancaireSearchRepositoryInternalImpl implements CarteBancaireSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;
    private final CarteBancaireRepository repository;

    CarteBancaireSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate, CarteBancaireRepository repository) {
        this.elasticsearchTemplate = elasticsearchTemplate;
        this.repository = repository;
    }

    @Override
    public Stream<CarteBancaire> search(String query) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        return search(nativeSearchQuery);
    }

    @Override
    public Stream<CarteBancaire> search(Query query) {
        return elasticsearchTemplate.search(query, CarteBancaire.class).map(SearchHit::getContent).stream();
    }

    @Override
    public void index(CarteBancaire entity) {
        repository.findById(entity.getId()).ifPresent(elasticsearchTemplate::save);
    }
}
