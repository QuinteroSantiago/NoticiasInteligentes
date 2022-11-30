package cloud.gomu.backend.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String taskName;
    private String taskDescription;

    @Column(columnDefinition = "date")
    @JsonFormat(pattern ="yyyy-MM-dd")
    private Date createdOn;

    public void setAllValues(String taskName, String taskDescription) {
        this.taskName = taskName;
        this.taskDescription = taskDescription;
    }

    public Long getId() {
        return id;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }
}
