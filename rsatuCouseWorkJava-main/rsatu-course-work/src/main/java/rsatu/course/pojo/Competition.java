package rsatu.course.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;
import org.hibernate.annotations.ColumnDefault;
import rsatu.course.enums.Type;

import javax.enterprise.inject.Default;
import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * Сущность Соревнование
 */
@Entity
@Table(name = "competition")
public class Competition extends PanacheEntity {

    //  дата начала соревнования
    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    @Temporal(TemporalType.DATE)
    public Date startDate;

    //  максимальное количество членов клуба, которое может принять участие в соревновании
    public Integer maxMembers;

    //  вид соревнования
    public Type type;

    //  вознаграждение за первое место
    public Double prize;

    //  признак завершения соревнования
    public Boolean isCompleted;

    // Дата завершения соревнования
    //@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    @Temporal(TemporalType.DATE)
    public Date endDate;

    //  список участников соревнования
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "competition_member",
            joinColumns = @JoinColumn(name = "competition_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id")
    )
    public Collection<Member> members;

    //  используемая наживка
    @ManyToOne
    @JoinColumn(name = "lure_id")
    public Lure lure;

    //  озеро, где проходит соревнование
    @ManyToOne
    @JoinColumn(name = "lake_id")
    public Lake lake;

    //  отчет
    @OneToOne(mappedBy = "competition", cascade = CascadeType.ALL)
    public FileInfo fileInfo;

    public static List<Competition> findAllCompetitions(){
        return listAll();
    }

    public static Competition findCompetitionById(Long id){
        return findById(id);
    }

    public static Competition insertCompetition(Competition competition) {
        competition.persist();
        return competition;
    }

    public Competition() {
    }
}