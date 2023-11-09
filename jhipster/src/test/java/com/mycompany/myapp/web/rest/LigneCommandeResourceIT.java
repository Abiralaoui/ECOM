package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.awaitility.Awaitility.await;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.LigneCommande;
import com.mycompany.myapp.repository.LigneCommandeRepository;
import com.mycompany.myapp.repository.search.LigneCommandeSearchRepository;
import com.mycompany.myapp.service.dto.LigneCommandeDTO;
import com.mycompany.myapp.service.mapper.LigneCommandeMapper;
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
 * Integration tests for the {@link LigneCommandeResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LigneCommandeResourceIT {

    private static final Integer DEFAULT_QUANTITE = 0;
    private static final Integer UPDATED_QUANTITE = 1;

    private static final Float DEFAULT_PRIX = 0F;
    private static final Float UPDATED_PRIX = 1F;

    private static final String ENTITY_API_URL = "/api/ligne-commandes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";
    private static final String ENTITY_SEARCH_API_URL = "/api/_search/ligne-commandes";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LigneCommandeRepository ligneCommandeRepository;

    @Autowired
    private LigneCommandeMapper ligneCommandeMapper;

    @Autowired
    private LigneCommandeSearchRepository ligneCommandeSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLigneCommandeMockMvc;

    private LigneCommande ligneCommande;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneCommande createEntity(EntityManager em) {
        LigneCommande ligneCommande = new LigneCommande().quantite(DEFAULT_QUANTITE).prix(DEFAULT_PRIX);
        return ligneCommande;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LigneCommande createUpdatedEntity(EntityManager em) {
        LigneCommande ligneCommande = new LigneCommande().quantite(UPDATED_QUANTITE).prix(UPDATED_PRIX);
        return ligneCommande;
    }

    @AfterEach
    public void cleanupElasticSearchRepository() {
        ligneCommandeSearchRepository.deleteAll();
        assertThat(ligneCommandeSearchRepository.count()).isEqualTo(0);
    }

    @BeforeEach
    public void initTest() {
        ligneCommande = createEntity(em);
    }

    @Test
    @Transactional
    void createLigneCommande() throws Exception {
        int databaseSizeBeforeCreate = ligneCommandeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        // Create the LigneCommande
        LigneCommandeDTO ligneCommandeDTO = ligneCommandeMapper.toDto(ligneCommande);
        restLigneCommandeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ligneCommandeDTO))
            )
            .andExpect(status().isCreated());

        // Validate the LigneCommande in the database
        List<LigneCommande> ligneCommandeList = ligneCommandeRepository.findAll();
        assertThat(ligneCommandeList).hasSize(databaseSizeBeforeCreate + 1);
        await()
            .atMost(5, TimeUnit.SECONDS)
            .untilAsserted(() -> {
                int searchDatabaseSizeAfter = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
                assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore + 1);
            });
        LigneCommande testLigneCommande = ligneCommandeList.get(ligneCommandeList.size() - 1);
        assertThat(testLigneCommande.getQuantite()).isEqualTo(DEFAULT_QUANTITE);
        assertThat(testLigneCommande.getPrix()).isEqualTo(DEFAULT_PRIX);
    }

    @Test
    @Transactional
    void createLigneCommandeWithExistingId() throws Exception {
        // Create the LigneCommande with an existing ID
        ligneCommande.setId(1L);
        LigneCommandeDTO ligneCommandeDTO = ligneCommandeMapper.toDto(ligneCommande);

        int databaseSizeBeforeCreate = ligneCommandeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());

        // An entity with an existing ID cannot be created, so this API call must fail
        restLigneCommandeMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ligneCommandeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCommande in the database
        List<LigneCommande> ligneCommandeList = ligneCommandeRepository.findAll();
        assertThat(ligneCommandeList).hasSize(databaseSizeBeforeCreate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void getAllLigneCommandes() throws Exception {
        // Initialize the database
        ligneCommandeRepository.saveAndFlush(ligneCommande);

        // Get all the ligneCommandeList
        restLigneCommandeMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ligneCommande.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)))
            .andExpect(jsonPath("$.[*].prix").value(hasItem(DEFAULT_PRIX.doubleValue())));
    }

    @Test
    @Transactional
    void getLigneCommande() throws Exception {
        // Initialize the database
        ligneCommandeRepository.saveAndFlush(ligneCommande);

        // Get the ligneCommande
        restLigneCommandeMockMvc
            .perform(get(ENTITY_API_URL_ID, ligneCommande.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ligneCommande.getId().intValue()))
            .andExpect(jsonPath("$.quantite").value(DEFAULT_QUANTITE))
            .andExpect(jsonPath("$.prix").value(DEFAULT_PRIX.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingLigneCommande() throws Exception {
        // Get the ligneCommande
        restLigneCommandeMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingLigneCommande() throws Exception {
        // Initialize the database
        ligneCommandeRepository.saveAndFlush(ligneCommande);

        int databaseSizeBeforeUpdate = ligneCommandeRepository.findAll().size();
        ligneCommandeSearchRepository.save(ligneCommande);
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());

        // Update the ligneCommande
        LigneCommande updatedLigneCommande = ligneCommandeRepository.findById(ligneCommande.getId()).get();
        // Disconnect from session so that the updates on updatedLigneCommande are not directly saved in db
        em.detach(updatedLigneCommande);
        updatedLigneCommande.quantite(UPDATED_QUANTITE).prix(UPDATED_PRIX);
        LigneCommandeDTO ligneCommandeDTO = ligneCommandeMapper.toDto(updatedLigneCommande);

        restLigneCommandeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ligneCommandeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCommandeDTO))
            )
            .andExpect(status().isOk());

        // Validate the LigneCommande in the database
        List<LigneCommande> ligneCommandeList = ligneCommandeRepository.findAll();
        assertThat(ligneCommandeList).hasSize(databaseSizeBeforeUpdate);
        LigneCommande testLigneCommande = ligneCommandeList.get(ligneCommandeList.size() - 1);
        assertThat(testLigneCommande.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testLigneCommande.getPrix()).isEqualTo(UPDATED_PRIX);
        await()
            .atMost(5, TimeUnit.SECONDS)
            .untilAsserted(() -> {
                int searchDatabaseSizeAfter = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
                assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
                List<LigneCommande> ligneCommandeSearchList = IterableUtils.toList(ligneCommandeSearchRepository.findAll());
                LigneCommande testLigneCommandeSearch = ligneCommandeSearchList.get(searchDatabaseSizeAfter - 1);
                assertThat(testLigneCommandeSearch.getQuantite()).isEqualTo(UPDATED_QUANTITE);
                assertThat(testLigneCommandeSearch.getPrix()).isEqualTo(UPDATED_PRIX);
            });
    }

    @Test
    @Transactional
    void putNonExistingLigneCommande() throws Exception {
        int databaseSizeBeforeUpdate = ligneCommandeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        ligneCommande.setId(count.incrementAndGet());

        // Create the LigneCommande
        LigneCommandeDTO ligneCommandeDTO = ligneCommandeMapper.toDto(ligneCommande);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneCommandeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, ligneCommandeDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCommandeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCommande in the database
        List<LigneCommande> ligneCommandeList = ligneCommandeRepository.findAll();
        assertThat(ligneCommandeList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void putWithIdMismatchLigneCommande() throws Exception {
        int databaseSizeBeforeUpdate = ligneCommandeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        ligneCommande.setId(count.incrementAndGet());

        // Create the LigneCommande
        LigneCommandeDTO ligneCommandeDTO = ligneCommandeMapper.toDto(ligneCommande);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCommandeMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(ligneCommandeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCommande in the database
        List<LigneCommande> ligneCommandeList = ligneCommandeRepository.findAll();
        assertThat(ligneCommandeList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLigneCommande() throws Exception {
        int databaseSizeBeforeUpdate = ligneCommandeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        ligneCommande.setId(count.incrementAndGet());

        // Create the LigneCommande
        LigneCommandeDTO ligneCommandeDTO = ligneCommandeMapper.toDto(ligneCommande);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCommandeMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(ligneCommandeDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LigneCommande in the database
        List<LigneCommande> ligneCommandeList = ligneCommandeRepository.findAll();
        assertThat(ligneCommandeList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void partialUpdateLigneCommandeWithPatch() throws Exception {
        // Initialize the database
        ligneCommandeRepository.saveAndFlush(ligneCommande);

        int databaseSizeBeforeUpdate = ligneCommandeRepository.findAll().size();

        // Update the ligneCommande using partial update
        LigneCommande partialUpdatedLigneCommande = new LigneCommande();
        partialUpdatedLigneCommande.setId(ligneCommande.getId());

        partialUpdatedLigneCommande.quantite(UPDATED_QUANTITE);

        restLigneCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLigneCommande.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLigneCommande))
            )
            .andExpect(status().isOk());

        // Validate the LigneCommande in the database
        List<LigneCommande> ligneCommandeList = ligneCommandeRepository.findAll();
        assertThat(ligneCommandeList).hasSize(databaseSizeBeforeUpdate);
        LigneCommande testLigneCommande = ligneCommandeList.get(ligneCommandeList.size() - 1);
        assertThat(testLigneCommande.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testLigneCommande.getPrix()).isEqualTo(DEFAULT_PRIX);
    }

    @Test
    @Transactional
    void fullUpdateLigneCommandeWithPatch() throws Exception {
        // Initialize the database
        ligneCommandeRepository.saveAndFlush(ligneCommande);

        int databaseSizeBeforeUpdate = ligneCommandeRepository.findAll().size();

        // Update the ligneCommande using partial update
        LigneCommande partialUpdatedLigneCommande = new LigneCommande();
        partialUpdatedLigneCommande.setId(ligneCommande.getId());

        partialUpdatedLigneCommande.quantite(UPDATED_QUANTITE).prix(UPDATED_PRIX);

        restLigneCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLigneCommande.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLigneCommande))
            )
            .andExpect(status().isOk());

        // Validate the LigneCommande in the database
        List<LigneCommande> ligneCommandeList = ligneCommandeRepository.findAll();
        assertThat(ligneCommandeList).hasSize(databaseSizeBeforeUpdate);
        LigneCommande testLigneCommande = ligneCommandeList.get(ligneCommandeList.size() - 1);
        assertThat(testLigneCommande.getQuantite()).isEqualTo(UPDATED_QUANTITE);
        assertThat(testLigneCommande.getPrix()).isEqualTo(UPDATED_PRIX);
    }

    @Test
    @Transactional
    void patchNonExistingLigneCommande() throws Exception {
        int databaseSizeBeforeUpdate = ligneCommandeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        ligneCommande.setId(count.incrementAndGet());

        // Create the LigneCommande
        LigneCommandeDTO ligneCommandeDTO = ligneCommandeMapper.toDto(ligneCommande);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLigneCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, ligneCommandeDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ligneCommandeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCommande in the database
        List<LigneCommande> ligneCommandeList = ligneCommandeRepository.findAll();
        assertThat(ligneCommandeList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLigneCommande() throws Exception {
        int databaseSizeBeforeUpdate = ligneCommandeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        ligneCommande.setId(count.incrementAndGet());

        // Create the LigneCommande
        LigneCommandeDTO ligneCommandeDTO = ligneCommandeMapper.toDto(ligneCommande);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ligneCommandeDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LigneCommande in the database
        List<LigneCommande> ligneCommandeList = ligneCommandeRepository.findAll();
        assertThat(ligneCommandeList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLigneCommande() throws Exception {
        int databaseSizeBeforeUpdate = ligneCommandeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        ligneCommande.setId(count.incrementAndGet());

        // Create the LigneCommande
        LigneCommandeDTO ligneCommandeDTO = ligneCommandeMapper.toDto(ligneCommande);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLigneCommandeMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(ligneCommandeDTO))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the LigneCommande in the database
        List<LigneCommande> ligneCommandeList = ligneCommandeRepository.findAll();
        assertThat(ligneCommandeList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void deleteLigneCommande() throws Exception {
        // Initialize the database
        ligneCommandeRepository.saveAndFlush(ligneCommande);
        ligneCommandeRepository.save(ligneCommande);
        ligneCommandeSearchRepository.save(ligneCommande);

        int databaseSizeBeforeDelete = ligneCommandeRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        assertThat(searchDatabaseSizeBefore).isEqualTo(databaseSizeBeforeDelete);

        // Delete the ligneCommande
        restLigneCommandeMockMvc
            .perform(delete(ENTITY_API_URL_ID, ligneCommande.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<LigneCommande> ligneCommandeList = ligneCommandeRepository.findAll();
        assertThat(ligneCommandeList).hasSize(databaseSizeBeforeDelete - 1);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(ligneCommandeSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore - 1);
    }

    @Test
    @Transactional
    void searchLigneCommande() throws Exception {
        // Initialize the database
        ligneCommande = ligneCommandeRepository.saveAndFlush(ligneCommande);
        ligneCommandeSearchRepository.save(ligneCommande);

        // Search the ligneCommande
        restLigneCommandeMockMvc
            .perform(get(ENTITY_SEARCH_API_URL + "?query=id:" + ligneCommande.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ligneCommande.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantite").value(hasItem(DEFAULT_QUANTITE)))
            .andExpect(jsonPath("$.[*].prix").value(hasItem(DEFAULT_PRIX.doubleValue())));
    }
}
