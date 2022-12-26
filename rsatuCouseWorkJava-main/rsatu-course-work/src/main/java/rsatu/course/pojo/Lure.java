package rsatu.course.pojo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.*;
import javax.ws.rs.NotFoundException;
import java.util.Collection;
import java.util.List;

/**
 * Сущность Наживка
 */
@Entity
@Table(name = "lure")
public class Lure extends PanacheEntity {

    //Название наживки
    public String name;

    //Глубина действия наживки
    public Double depth;

    //  Список соревнований, где используется наживка
    @OneToMany(mappedBy = "lure")
    @JsonIgnore
    public Collection<Competition> competitions;

    public Lure() {
    }

    public static List<Lure> findAllLures(){
        return listAll();
    }

    public static List<Lure> findLureById(String id){
        return findById(id);
    }

    public static Lure insertLure(Lure lure) {
        lure.persist();
        return lure;
    }

    public static void deleteLureById(Long id) {
        Lure lure = findById(id);
        if (lure == null) {
            throw new NotFoundException();
        }
        lure.delete();
    }

    public static Lure findLureByName(String name) {
        return find("name", name).firstResult();
    }
}
