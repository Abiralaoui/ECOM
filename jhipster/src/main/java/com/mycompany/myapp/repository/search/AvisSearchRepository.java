package com.mycompany.myapp.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.mycompany.myapp.domain.Avis;
import com.mycompany.myapp.repository.AvisRepository;
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
 * Spring Data Elasticsearch repository for the {@link Avis} entity.
 */
public interface AvisSearchRepository extends ElasticsearchRepository<Avis, Long>, AvisSearchRepositoryInternal {}

interface AvisSearchRepositoryInternal {
    Stream<Avis> search(String query);

    Stream<Avis> search(Query query);

    void index(Avis entity);
}

class AvisSearchRepositoryInternalImpl implements AvisSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;
    private final AvisRepository repository;

    AvisSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate, AvisRepository repository) {
        this.elasticsearchTemplate = elasticsearchTemplate;
        this.repository = repository;
    }

    @Override
    public Stream<Avis> search(String query) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        return search(nativeSearchQuery);
    }

    @Override
    public Stream<Avis> search(Query query) {
        return elasticsearchTemplate.search(query, Avis.class).map(SearchHit::getContent).stream();
    }

    @Override
    public void index(Avis entity) {
        repository.findById(entity.getId()).ifPresent(elasticsearchTemplate::save);
    }
}
