package rsatu.course.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;
import javax.ws.rs.NotFoundException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "lake")
public class Lake extends PanacheEntity {
    //    Площадь озера
    public Double area;

    //    Глубина озера
    public Double depth;

    //    Название озера
    public String name;

    // список соревнований, проходящих на озере
    @OneToMany(mappedBy = "lake")
    @JsonIgnore
    public Collection<Competition> competitions;

    //  список рыб которые обитают в озере
    @ManyToMany
    @JsonIgnore
    @JoinTable(name = "lake_fish",
            joinColumns = @JoinColumn(name = "lake_id"),
            inverseJoinColumns = @JoinColumn(name = "fish_id")
    )
    public Collection<Fish> fishes;

    public Lake() {
    }

    public static List<Lake> findAllLakes(){
        return listAll();
    }

    public static Lake findLakeById(Long id){
        return findById(id);
    }

    public static Lake findLakeByName(String name) {
        return find("name", name).firstResult();
    }

    public static Lake insertLake(Lake lake) {
        lake.persist();
        return lake;
    }

    public static void deleteLakeById(Long id) {
        Lake lake = findById(id);
        if (lake == null) {
            throw new NotFoundException();
        }
        lake.delete();
    }
}
