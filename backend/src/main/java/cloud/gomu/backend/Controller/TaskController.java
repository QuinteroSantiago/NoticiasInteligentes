package cloud.gomu.backend.Controller;

import cloud.gomu.backend.Entity.Task;
import cloud.gomu.backend.Repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskRepository repository;

    public TaskController(TaskRepository repository) {
        this.repository = repository;
    }
    @GetMapping("/")
    public Iterable<Task> getAllTasks() {
        return this.repository.findAll();
    }
    @PostMapping("/")
    public Task createTask(@RequestBody Task task) {
        this.repository.save(task);
        System.out.println(repository.findAll());
        return repository.findAll().iterator().next();
    }
    @GetMapping("/{id}")
    public Task getTask(@PathVariable(value = "id") Long id) {
        return repository.findById(id).get();
    }
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        Task updatedTask = repository.findById(id).get();
        updatedTask.setAllValues(task.getTaskName(), task.getTaskDescription());
        return repository.save(updatedTask);
    }
    @DeleteMapping("{id}")
    public void deleteTask(@PathVariable Long id) {
        repository.delete(repository.findById(id).get());
    }
}
