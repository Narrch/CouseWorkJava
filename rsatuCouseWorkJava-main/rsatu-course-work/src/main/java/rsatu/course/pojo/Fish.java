package rsatu.course.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;
import javax.ws.rs.NotFoundException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Сущность Рыба
 */
@Entity
@Table(name = "fish")
public class Fish extends PanacheEntity {
    //    Название семейства рыб
    public String kind;

    //    Название рыбы
    public String name;

    //    Средняя глубина обитания рыбы в озере
    public Double depth;

    //    Средний вес рыбы
    public Double weight;

    //  Список озер, где водится рыба
    @ManyToMany(mappedBy = "fishes")
    @JsonIgnore
    public Collection<Lake> lakes;

    public Fish() {
    }

    public static List<Fish> findAllFishes(){
        return listAll();
    }

    public static List<Fish> findFishById(String id){
        return findById(id);
    }

    public static Fish insertFish(Fish fish) {
        fish.persist();
        return fish;
    }

    public static void deleteFishById(Long id) {
        Fish fish = findById(id);
        if (fish == null) {
            throw new NotFoundException();
        }
        fish.delete();
    }
}
