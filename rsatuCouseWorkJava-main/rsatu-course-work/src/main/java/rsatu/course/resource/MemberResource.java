package rsatu.course.resource;

import io.quarkus.security.Authenticated;
import io.quarkus.security.identity.SecurityIdentity;
import org.eclipse.microprofile.jwt.JsonWebToken;
import rsatu.course.enums.Role;
import rsatu.course.pojo.Member;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("api/member")
public class MemberResource {

    @Inject
    JsonWebToken jwt;

    @Inject
    SecurityIdentity identity;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/get")
    @Authenticated
    public Response getMembers() {
        return Response.ok(Member.findAllMembers()).build();
    }

    @Transactional
    @Authenticated
    public Member getMember() {
        String email = jwt.getClaim("email");
        Member user = Member.findByEmail(email);
        if (user == null) {
            //Если пользователя еще нет, то создадим его
            user = new Member();
            user.email = email;

            String buffer = jwt.getClaim("realm_access").toString();
            //Поиск роли пользователя
            Role r = null;
            if (buffer.contains("user")) {
                r = Role.MEMBER;
            } else if (buffer.contains("organizer")) {
                r = Role.ORGANIZER;
            } else if (buffer.contains("admin")) {
                r = Role.ADMIN;
            }

            user.role = r;

            Member.persist(user);
            return user;
        } else {
            //если пользователь уже существует, то возвращаем его
            return user;
        }
    }
    
    /** Возвращает пользователя из базы из токена
     *
     */
    @Transactional
    @GET
    @Path("/user")
    @Produces("application/json")
    @Consumes("application/json")
    @Authenticated
    public Response findCurUser() {
        return Response.ok(getMember()).build();
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/get/{id}")
    @Authenticated
    @Transactional
    public Response updateMember(@PathParam("id") Long id, Member member) {
        Member curMember = Member.findMemberById(id);
        if (curMember == null) return Response.serverError().build();
        curMember.fio = member.fio;
        curMember.birthDate = member.birthDate;
        curMember.sex = member.sex;
        return Response.ok(curMember).build();
    }
}
