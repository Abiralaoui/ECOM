package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.awaitility.Awaitility.await;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Admin;
import com.mycompany.myapp.repository.AdminRepository;
import com.mycompany.myapp.repository.search.AdminSearchRepository;
import com.mycompany.myapp.service.dto.AdminDTO;
import com.mycompany.myapp.service.mapper.AdminMapper;
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
 * Integration tests for the {@link AdminResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class AdminResourceIT {

    private static final String DEFAULT_IDENTIFIANT = "AAAAAAAAAA";
    private static final String UPDATED_IDENTIFIANT = "BBBBBBBBBB";

    private static final String DEFAULT_MOT_DE_PASSE = "AAAAAAAAAA";
    private static final String UPDATED_MOT_DE_PASSE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/admins";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";
    private static final String ENTITY_SEARCH_API_URL = "/api/_search/admins";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AdminMapper adminMapper;

    @Autowired
    private AdminSearchRepository adminSearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAdminMockMvc;

    private Admin admin;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Admin createEntity(EntityManager em) {
        Admin admin = new Admin().identifiant(DEFAULT_IDENTIFIANT).motDePasse(DEFAULT_MOT_DE_PASSE);
        return admin;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Admin createUpdatedEntity(EntityManager em) {
        Admin admin = new Admin().identifiant(UPDATED_IDENTIFIANT).motDePasse(UPDATED_MOT_DE_PASSE);
        return admin;
    }

    @AfterEach
    public void cleanupElasticSearchRepository() {
        adminSearchRepository.deleteAll();
        assertThat(adminSearchRepository.count()).isEqualTo(0);
    }

    @BeforeEach
    public void initTest() {
        admin = createEntity(em);
    }

    @Test
    @Transactional
    void createAdmin() throws Exception {
        int databaseSizeBeforeCreate = adminRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(adminSearchRepository.findAll());
        // Create the Admin
        AdminDTO adminDTO = adminMapper.toDto(admin);
        restAdminMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(adminDTO)))
            .andExpect(status().isCreated());

        // Validate the Admin in the database
        List<Admin> adminList = adminRepository.findAll();
        assertThat(adminList).hasSize(databaseSizeBeforeCreate + 1);
        await()
            .atMost(5, TimeUnit.SECONDS)
            .untilAsserted(() -> {
                int searchDatabaseSizeAfter = IterableUtil.sizeOf(adminSearchRepository.findAll());
                assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore + 1);
            });
        Admin testAdmin = adminList.get(adminList.size() - 1);
        assertThat(testAdmin.getIdentifiant()).isEqualTo(DEFAULT_IDENTIFIANT);
        assertThat(testAdmin.getMotDePasse()).isEqualTo(DEFAULT_MOT_DE_PASSE);
    }

    @Test
    @Transactional
    void createAdminWithExistingId() throws Exception {
        // Create the Admin with an existing ID
        admin.setId(1L);
        AdminDTO adminDTO = adminMapper.toDto(admin);

        int databaseSizeBeforeCreate = adminRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(adminSearchRepository.findAll());

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdminMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(adminDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Admin in the database
        List<Admin> adminList = adminRepository.findAll();
        assertThat(adminList).hasSize(databaseSizeBeforeCreate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(adminSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void getAllAdmins() throws Exception {
        // Initialize the database
        adminRepository.saveAndFlush(admin);

        // Get all the adminList
        restAdminMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(admin.getId().intValue())))
            .andExpect(jsonPath("$.[*].identifiant").value(hasItem(DEFAULT_IDENTIFIANT)))
            .andExpect(jsonPath("$.[*].motDePasse").value(hasItem(DEFAULT_MOT_DE_PASSE)));
    }

    @Test
    @Transactional
    void getAdmin() throws Exception {
        // Initialize the database
        adminRepository.saveAndFlush(admin);

        // Get the admin
        restAdminMockMvc
            .perform(get(ENTITY_API_URL_ID, admin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(admin.getId().intValue()))
            .andExpect(jsonPath("$.identifiant").value(DEFAULT_IDENTIFIANT))
            .andExpect(jsonPath("$.motDePasse").value(DEFAULT_MOT_DE_PASSE));
    }

    @Test
    @Transactional
    void getNonExistingAdmin() throws Exception {
        // Get the admin
        restAdminMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAdmin() throws Exception {
        // Initialize the database
        adminRepository.saveAndFlush(admin);

        int databaseSizeBeforeUpdate = adminRepository.findAll().size();
        adminSearchRepository.save(admin);
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(adminSearchRepository.findAll());

        // Update the admin
        Admin updatedAdmin = adminRepository.findById(admin.getId()).get();
        // Disconnect from session so that the updates on updatedAdmin are not directly saved in db
        em.detach(updatedAdmin);
        updatedAdmin.identifiant(UPDATED_IDENTIFIANT).motDePasse(UPDATED_MOT_DE_PASSE);
        AdminDTO adminDTO = adminMapper.toDto(updatedAdmin);

        restAdminMockMvc
            .perform(
                put(ENTITY_API_URL_ID, adminDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(adminDTO))
            )
            .andExpect(status().isOk());

        // Validate the Admin in the database
        List<Admin> adminList = adminRepository.findAll();
        assertThat(adminList).hasSize(databaseSizeBeforeUpdate);
        Admin testAdmin = adminList.get(adminList.size() - 1);
        assertThat(testAdmin.getIdentifiant()).isEqualTo(UPDATED_IDENTIFIANT);
        assertThat(testAdmin.getMotDePasse()).isEqualTo(UPDATED_MOT_DE_PASSE);
        await()
            .atMost(5, TimeUnit.SECONDS)
            .untilAsserted(() -> {
                int searchDatabaseSizeAfter = IterableUtil.sizeOf(adminSearchRepository.findAll());
                assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
                List<Admin> adminSearchList = IterableUtils.toList(adminSearchRepository.findAll());
                Admin testAdminSearch = adminSearchList.get(searchDatabaseSizeAfter - 1);
                assertThat(testAdminSearch.getIdentifiant()).isEqualTo(UPDATED_IDENTIFIANT);
                assertThat(testAdminSearch.getMotDePasse()).isEqualTo(UPDATED_MOT_DE_PASSE);
            });
    }

    @Test
    @Transactional
    void putNonExistingAdmin() throws Exception {
        int databaseSizeBeforeUpdate = adminRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(adminSearchRepository.findAll());
        admin.setId(count.incrementAndGet());

        // Create the Admin
        AdminDTO adminDTO = adminMapper.toDto(admin);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdminMockMvc
            .perform(
                put(ENTITY_API_URL_ID, adminDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(adminDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Admin in the database
        List<Admin> adminList = adminRepository.findAll();
        assertThat(adminList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(adminSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void putWithIdMismatchAdmin() throws Exception {
        int databaseSizeBeforeUpdate = adminRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(adminSearchRepository.findAll());
        admin.setId(count.incrementAndGet());

        // Create the Admin
        AdminDTO adminDTO = adminMapper.toDto(admin);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdminMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(adminDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Admin in the database
        List<Admin> adminList = adminRepository.findAll();
        assertThat(adminList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(adminSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAdmin() throws Exception {
        int databaseSizeBeforeUpdate = adminRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(adminSearchRepository.findAll());
        admin.setId(count.incrementAndGet());

        // Create the Admin
        AdminDTO adminDTO = adminMapper.toDto(admin);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdminMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(adminDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Admin in the database
        List<Admin> adminList = adminRepository.findAll();
        assertThat(adminList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(adminSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void partialUpdateAdminWithPatch() throws Exception {
        // Initialize the database
        adminRepository.saveAndFlush(admin);

        int databaseSizeBeforeUpdate = adminRepository.findAll().size();

        // Update the admin using partial update
        Admin partialUpdatedAdmin = new Admin();
        partialUpdatedAdmin.setId(admin.getId());

        partialUpdatedAdmin.identifiant(UPDATED_IDENTIFIANT);

        restAdminMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAdmin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAdmin))
            )
            .andExpect(status().isOk());

        // Validate the Admin in the database
        List<Admin> adminList = adminRepository.findAll();
        assertThat(adminList).hasSize(databaseSizeBeforeUpdate);
        Admin testAdmin = adminList.get(adminList.size() - 1);
        assertThat(testAdmin.getIdentifiant()).isEqualTo(UPDATED_IDENTIFIANT);
        assertThat(testAdmin.getMotDePasse()).isEqualTo(DEFAULT_MOT_DE_PASSE);
    }

    @Test
    @Transactional
    void fullUpdateAdminWithPatch() throws Exception {
        // Initialize the database
        adminRepository.saveAndFlush(admin);

        int databaseSizeBeforeUpdate = adminRepository.findAll().size();

        // Update the admin using partial update
        Admin partialUpdatedAdmin = new Admin();
        partialUpdatedAdmin.setId(admin.getId());

        partialUpdatedAdmin.identifiant(UPDATED_IDENTIFIANT).motDePasse(UPDATED_MOT_DE_PASSE);

        restAdminMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAdmin.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedAdmin))
            )
            .andExpect(status().isOk());

        // Validate the Admin in the database
        List<Admin> adminList = adminRepository.findAll();
        assertThat(adminList).hasSize(databaseSizeBeforeUpdate);
        Admin testAdmin = adminList.get(adminList.size() - 1);
        assertThat(testAdmin.getIdentifiant()).isEqualTo(UPDATED_IDENTIFIANT);
        assertThat(testAdmin.getMotDePasse()).isEqualTo(UPDATED_MOT_DE_PASSE);
    }

    @Test
    @Transactional
    void patchNonExistingAdmin() throws Exception {
        int databaseSizeBeforeUpdate = adminRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(adminSearchRepository.findAll());
        admin.setId(count.incrementAndGet());

        // Create the Admin
        AdminDTO adminDTO = adminMapper.toDto(admin);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdminMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, adminDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(adminDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Admin in the database
        List<Admin> adminList = adminRepository.findAll();
        assertThat(adminList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(adminSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAdmin() throws Exception {
        int databaseSizeBeforeUpdate = adminRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(adminSearchRepository.findAll());
        admin.setId(count.incrementAndGet());

        // Create the Admin
        AdminDTO adminDTO = adminMapper.toDto(admin);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdminMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(adminDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Admin in the database
        List<Admin> adminList = adminRepository.findAll();
        assertThat(adminList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(adminSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAdmin() throws Exception {
        int databaseSizeBeforeUpdate = adminRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(adminSearchRepository.findAll());
        admin.setId(count.incrementAndGet());

        // Create the Admin
        AdminDTO adminDTO = adminMapper.toDto(admin);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAdminMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(adminDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Admin in the database
        List<Admin> adminList = adminRepository.findAll();
        assertThat(adminList).hasSize(databaseSizeBeforeUpdate);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(adminSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore);
    }

    @Test
    @Transactional
    void deleteAdmin() throws Exception {
        // Initialize the database
        adminRepository.saveAndFlush(admin);
        adminRepository.save(admin);
        adminSearchRepository.save(admin);

        int databaseSizeBeforeDelete = adminRepository.findAll().size();
        int searchDatabaseSizeBefore = IterableUtil.sizeOf(adminSearchRepository.findAll());
        assertThat(searchDatabaseSizeBefore).isEqualTo(databaseSizeBeforeDelete);

        // Delete the admin
        restAdminMockMvc
            .perform(delete(ENTITY_API_URL_ID, admin.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Admin> adminList = adminRepository.findAll();
        assertThat(adminList).hasSize(databaseSizeBeforeDelete - 1);
        int searchDatabaseSizeAfter = IterableUtil.sizeOf(adminSearchRepository.findAll());
        assertThat(searchDatabaseSizeAfter).isEqualTo(searchDatabaseSizeBefore - 1);
    }

    @Test
    @Transactional
    void searchAdmin() throws Exception {
        // Initialize the database
        admin = adminRepository.saveAndFlush(admin);
        adminSearchRepository.save(admin);

        // Search the admin
        restAdminMockMvc
            .perform(get(ENTITY_SEARCH_API_URL + "?query=id:" + admin.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(admin.getId().intValue())))
            .andExpect(jsonPath("$.[*].identifiant").value(hasItem(DEFAULT_IDENTIFIANT)))
            .andExpect(jsonPath("$.[*].motDePasse").value(hasItem(DEFAULT_MOT_DE_PASSE)));
    }
}
