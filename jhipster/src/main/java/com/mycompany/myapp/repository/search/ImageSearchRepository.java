package com.mycompany.myapp.repository.search;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import com.mycompany.myapp.domain.Image;
import com.mycompany.myapp.repository.ImageRepository;
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
 * Spring Data Elasticsearch repository for the {@link Image} entity.
 */
public interface ImageSearchRepository extends ElasticsearchRepository<Image, Long>, ImageSearchRepositoryInternal {}

interface ImageSearchRepositoryInternal {
    Stream<Image> search(String query);

    Stream<Image> search(Query query);

    void index(Image entity);
}

class ImageSearchRepositoryInternalImpl implements ImageSearchRepositoryInternal {

    private final ElasticsearchRestTemplate elasticsearchTemplate;
    private final ImageRepository repository;

    ImageSearchRepositoryInternalImpl(ElasticsearchRestTemplate elasticsearchTemplate, ImageRepository repository) {
        this.elasticsearchTemplate = elasticsearchTemplate;
        this.repository = repository;
    }

    @Override
    public Stream<Image> search(String query) {
        NativeSearchQuery nativeSearchQuery = new NativeSearchQuery(queryStringQuery(query));
        return search(nativeSearchQuery);
    }

    @Override
    public Stream<Image> search(Query query) {
        return elasticsearchTemplate.search(query, Image.class).map(SearchHit::getContent).stream();
    }

    @Override
    public void index(Image entity) {
        repository.findById(entity.getId()).ifPresent(elasticsearchTemplate::save);
    }
}
