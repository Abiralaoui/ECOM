package com.mycompany.myapp.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.mycompany.myapp.domain.Admin;
import com.mycompany.myapp.repository.AdminRepository;
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
 * Spring Data Elasticsearch repository for the {@link Admin} entity.
 */
public interface AdminSearchRepository extends ElasticsearchRepository<Admin, Long>, AdminSearchRepositoryInternal {}

interface AdminSearchRepositoryInternal {
    Stream<Admin> search(String query);

    Stream<Admin> search(Query query);

    void index(Admin entity);
}

class AdminSearchRepositoryInternalImpl implements AdminSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;
    private final AdminRepository repository;

    AdminSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate, AdminRepository repository) {
        this.elasticsearchTemplate = elasticsearchTemplate;
        this.repository = repository;
    }

    @Override
    public Stream<Admin> search(String query) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        return search(nativeSearchQuery);
    }

    @Override
    public Stream<Admin> search(Query query) {
        return elasticsearchTemplate.search(query, Admin.class).map(SearchHit::getContent).stream();
    }

    @Override
    public void index(Admin entity) {
        repository.findById(entity.getId()).ifPresent(elasticsearchTemplate::save);
    }
}
