package cloud.gomu.backend.Repository;

import cloud.gomu.backend.Entity.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Long> {
}