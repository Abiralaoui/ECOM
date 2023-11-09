package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.awaitility.Awaitility.await;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Avis;
import com.mycompany.myapp.repository.AvisRepository;
import com.mycompany.myapp.repository.search.AvisSearchRepository;
import com.mycompany.myapp.service.dto.AvisDTO;
import com.mycompany.myapp.service.mapper.AvisMapper;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Stream;
import javax.persistence.EntityManager;
import org.apache.commons.collections4.IterableUtils;
import org.assertj.core.util.IterableUtil;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link AvisResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AvisResourceIT {

    private static final Integer DEFAULT_NOTE = 1;
    private static final Integer UPDATED_NOTE = 2;

    private static final String DEFAULT_COMMENTAIRE = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTAIRE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/avis";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";
    private static final String ENTITY_SEARCH_API_URL = "/api/_search/avis";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AvisRepository avisRepository;

    @Autowired
    private AvisMapper avisMapper;

    @Autowired
    private AvisSearchRepository avisSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAvisMockMvc;

    private Avis avis;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Avis createEntity(EntityManager em) {
        Avis avis = new Avis().note(DEFAULT_NOTE).commentaire(DEFAULT_COMMENTAIRE).date(DEFAULT_DATE);
        return avis;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Avis createUpdatedEntity(EntityManager em) {
        Avis avis = new Avis().note(UPDATED_NOTE).commentaire(UPDATED_COMMENTAIRE).date(UPDATED_DATE);
        return avis;
    }

    @AfterEach
    public void cleanupElasticSearchRepository() {
        avisSearchRepository.deleteAll();
        assertThat(avisSearchRepository.count()).isEqualTo(0);
    }

    @BeforeEach
    public void initTest() {
        avis = createEntity(em);
    }

    @Test
    @Transactional
    void createAvis() throws Exception {
        int databaseSizeBeforeCreate = avisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(avisSearchRepository.findAll());
        // Create the Avis
        AvisDTO avisDTO = avisMapper.toDto(avis);
        restAvisMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(avisDTO)))
            .andExpect(status().isCreated());

        // Validate the Avis in the database
        List<Avis> avisList = avisRepository.findAll();
        assertThat(avisList).hasSize(databaseSizeBeforeCreate + 1);
        await()
            .atMost(5, TimeUnit.SECONDS)
            .untilAsserted(() -> {
                int searchDatabaseSizeAfter = IterableUtil.sizeOf(avisSearchRepository.findAll());
                assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore + 1);
            });
        Avis testAvis = avisList.get(avisList.size() - 1);
        assertThat(testAvis.getNote()).isEqualTo(DEFAULT_NOTE);
        assertThat(testAvis.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
        assertThat(testAvis.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    void createAvisWithExistingId() throws Exception {
        // Create the Avis with an existing ID
        avis.setId(1L);
        AvisDTO avisDTO = avisMapper.toDto(avis);

        int databaseSizeBeforeCreate = avisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(avisSearchRepository.findAll());

        // An entity with an existing ID cannot be created, so this API call must fail
        restAvisMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(avisDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Avis in the database
        List<Avis> avisList = avisRepository.findAll();
        assertThat(avisList).hasSize(databaseSizeBeforeCreate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(avisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void getAllAvis() throws Exception {
        // Initialize the database
        avisRepository.saveAndFlush(avis);

        // Get all the avisList
        restAvisMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(avis.getId().intValue())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE)))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    void getAvis() throws Exception {
        // Initialize the database
        avisRepository.saveAndFlush(avis);

        // Get the avis
        restAvisMockMvc
            .perform(get(ENTITY_API_URL_ID, avis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(avis.getId().intValue()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE))
            .andExpect(jsonPath("$.commentaire").value(DEFAULT_COMMENTAIRE))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingAvis() throws Exception {
        // Get the avis
        restAvisMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAvis() throws Exception {
        // Initialize the database
        avisRepository.saveAndFlush(avis);

        int databaseSizeBeforeUpdate = avisRepository.findAll().size();
        avisSearchRepository.save(avis);
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(avisSearchRepository.findAll());

        // Update the avis
        Avis updatedAvis = avisRepository.findById(avis.getId()).get();
        // Disconnect from session so that the updates on updatedAvis are not directly saved in db
        em.detach(updatedAvis);
        updatedAvis.note(UPDATED_NOTE).commentaire(UPDATED_COMMENTAIRE).date(UPDATED_DATE);
        AvisDTO avisDTO = avisMapper.toDto(updatedAvis);

        restAvisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, avisDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(avisDTO))
            )
            .andExpect(status().isOk());

        // Validate the Avis in the database
        List<Avis> avisList = avisRepository.findAll();
        assertThat(avisList).hasSize(databaseSizeBeforeUpdate);
        Avis testAvis = avisList.get(avisList.size() - 1);
        assertThat(testAvis.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testAvis.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
        assertThat(testAvis.getDate()).isEqualTo(UPDATED_DATE);
        await()
            .atMost(5, TimeUnit.SECONDS)
            .untilAsserted(() -> {
                int searchDatabaseSizeAfter = IterableUtil.sizeOf(avisSearchRepository.findAll());
                assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
                List<Avis> avisSearchList = IterableUtils.toList(avisSearchRepository.findAll());
                Avis testAvisSearch = avisSearchList.get(searchDatabaseSizeAfter - 1);
                assertThat(testAvisSearch.getNote()).isEqualTo(UPDATED_NOTE);
                assertThat(testAvisSearch.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
                assertThat(testAvisSearch.getDate()).isEqualTo(UPDATED_DATE);
            });
    }

    @Test
    @Transactional
    void putNonExistingAvis() throws Exception {
        int databaseSizeBeforeUpdate = avisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(avisSearchRepository.findAll());
        avis.setId(count.incrementAndGet());

        // Create the Avis
        AvisDTO avisDTO = avisMapper.toDto(avis);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAvisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, avisDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(avisDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Avis in the database
        List<Avis> avisList = avisRepository.findAll();
        assertThat(avisList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(avisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void putWithIdMismatchAvis() throws Exception {
        int databaseSizeBeforeUpdate = avisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(avisSearchRepository.findAll());
        avis.setId(count.incrementAndGet());

        // Create the Avis
        AvisDTO avisDTO = avisMapper.toDto(avis);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAvisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(avisDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Avis in the database
        List<Avis> avisList = avisRepository.findAll();
        assertThat(avisList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(avisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAvis() throws Exception {
        int databaseSizeBeforeUpdate = avisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(avisSearchRepository.findAll());
        avis.setId(count.incrementAndGet());

        // Create the Avis
        AvisDTO avisDTO = avisMapper.toDto(avis);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAvisMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(avisDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Avis in the database
        List<Avis> avisList = avisRepository.findAll();
        assertThat(avisList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(avisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void partialUpdateAvisWithPatch() throws Exception {
        // Initialize the database
        avisRepository.saveAndFlush(avis);

        int databaseSizeBeforeUpdate = avisRepository.findAll().size();

        // Update the avis using partial update
        Avis partialUpdatedAvis = new Avis();
        partialUpdatedAvis.setId(avis.getId());

        partialUpdatedAvis.note(UPDATED_NOTE).commentaire(UPDATED_COMMENTAIRE).date(UPDATED_DATE);

        restAvisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAvis.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAvis))
            )
            .andExpect(status().isOk());

        // Validate the Avis in the database
        List<Avis> avisList = avisRepository.findAll();
        assertThat(avisList).hasSize(databaseSizeBeforeUpdate);
        Avis testAvis = avisList.get(avisList.size() - 1);
        assertThat(testAvis.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testAvis.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
        assertThat(testAvis.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    void fullUpdateAvisWithPatch() throws Exception {
        // Initialize the database
        avisRepository.saveAndFlush(avis);

        int databaseSizeBeforeUpdate = avisRepository.findAll().size();

        // Update the avis using partial update
        Avis partialUpdatedAvis = new Avis();
        partialUpdatedAvis.setId(avis.getId());

        partialUpdatedAvis.note(UPDATED_NOTE).commentaire(UPDATED_COMMENTAIRE).date(UPDATED_DATE);

        restAvisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAvis.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAvis))
            )
            .andExpect(status().isOk());

        // Validate the Avis in the database
        List<Avis> avisList = avisRepository.findAll();
        assertThat(avisList).hasSize(databaseSizeBeforeUpdate);
        Avis testAvis = avisList.get(avisList.size() - 1);
        assertThat(testAvis.getNote()).isEqualTo(UPDATED_NOTE);
        assertThat(testAvis.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
        assertThat(testAvis.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    void patchNonExistingAvis() throws Exception {
        int databaseSizeBeforeUpdate = avisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(avisSearchRepository.findAll());
        avis.setId(count.incrementAndGet());

        // Create the Avis
        AvisDTO avisDTO = avisMapper.toDto(avis);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAvisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, avisDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(avisDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Avis in the database
        List<Avis> avisList = avisRepository.findAll();
        assertThat(avisList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(avisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAvis() throws Exception {
        int databaseSizeBeforeUpdate = avisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(avisSearchRepository.findAll());
        avis.setId(count.incrementAndGet());

        // Create the Avis
        AvisDTO avisDTO = avisMapper.toDto(avis);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAvisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(avisDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Avis in the database
        List<Avis> avisList = avisRepository.findAll();
        assertThat(avisList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(avisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAvis() throws Exception {
        int databaseSizeBeforeUpdate = avisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(avisSearchRepository.findAll());
        avis.setId(count.incrementAndGet());

        // Create the Avis
        AvisDTO avisDTO = avisMapper.toDto(avis);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAvisMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(avisDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Avis in the database
        List<Avis> avisList = avisRepository.findAll();
        assertThat(avisList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(avisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void deleteAvis() throws Exception {
        // Initialize the database
        avisRepository.saveAndFlush(avis);
        avisRepository.save(avis);
        avisSearchRepository.save(avis);

        int databaseSizeBeforeDelete = avisRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(avisSearchRepository.findAll());
        assertThat(searchDatabaseSizeBefore).isEqualTo(databaseSizeBeforeDelete);

        // Delete the avis
        restAvisMockMvc
            .perform(delete(ENTITY_API_URL_ID, avis.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Avis> avisList = avisRepository.findAll();
        assertThat(avisList).hasSize(databaseSizeBeforeDelete - 1);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(avisSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore - 1);
    }

    @Test
    @Transactional
    void searchAvis() throws Exception {
        // Initialize the database
        avis = avisRepository.saveAndFlush(avis);
        avisSearchRepository.save(avis);

        // Search the avis
        restAvisMockMvc
            .perform(get(ENTITY_SEARCH_API_URL + "?query=id:" + avis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(avis.getId().intValue())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE)))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
}
