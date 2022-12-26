package rsatu.course.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * Сущность Информация о файле с итогами соревнования
 */
@Entity
@Table(name = "fileinfo")
public class FileInfo extends PanacheEntity {
    //имя файла
    public String name;
    //дата загрузки
    public LocalDate uploadDate;

    // список соревнований, проходящих на озере
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "competition_id")
    @JsonIgnore
    public Competition competition;

    public static FileInfo findFileInfoByIdComp(Long id) {
        return (FileInfo) find("competition.id", id).firstResult();
    }
}