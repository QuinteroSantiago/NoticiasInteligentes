package cloud.gomu.backend.Controller;

import cloud.gomu.backend.Repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.instanceOf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class TaskEndpointTests {
    @Autowired
    MockMvc mvc;
    @Autowired
    TaskRepository taskRepository;

    @Test
    @Transactional
    @Rollback
    public void testCreateTask() throws Exception {
        MockHttpServletRequestBuilder request = post("/api/tasks/")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"taskName\": \"Sample Task\"}");
        this.mvc.perform(request)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", instanceOf(Number.class)));
    }
}
