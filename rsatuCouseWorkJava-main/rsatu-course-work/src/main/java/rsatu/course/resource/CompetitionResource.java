package rsatu.course.resource;

import io.quarkus.security.Authenticated;
import rsatu.course.pojo.Competition;
import rsatu.course.pojo.Lake;
import rsatu.course.pojo.Member;

import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("api/competition")
@ApplicationScoped
public class CompetitionResource {

    @Transactional
    @GET
    @Consumes("application/json")
    @Produces("application/json")
    @Path("/get")
    @Authenticated
    public Response getCompetitions() {
        return Response.ok(Competition.findAllCompetitions()).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/insert")
    @Transactional
    @RolesAllowed("organizer")
    public Response insertCompetition(Competition competition) {
        return Response.ok(Competition.insertCompetition(competition)).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{idCompetition}/lakes/{idLake}")
    @Transactional
    @RolesAllowed("organizer")
    public Response addLakeById(Long idCompetition, Long idLake) {
        Lake lake = Lake.findLakeById(idLake);
        Competition competition = Competition.findCompetitionById(idCompetition);
        if (lake != null && competition != null) {
            competition.lake = lake;
            return Response.ok(competition).build();
        }
        return Response.serverError().build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{idCompetition}/lakes/name/{nameLake}")
    @Transactional
    @RolesAllowed("organizer")
    public Response addLakeByName(Long idCompetition, String nameLake) {
        Lake lake = Lake.findLakeByName(nameLake);
        Competition competition = Competition.findCompetitionById(idCompetition);
        if (lake != null && competition != null) {
            competition.lake = lake;
            return Response.ok(competition).build();
        }
        return Response.serverError().build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{idCompetition}/members/{idMember}")
    @Transactional
    @Authenticated
    public Response addMemberByCompId(Long idCompetition, Long idMember) {
        Member member = Member.findMemberById(idMember);
        Competition competition = Competition.findCompetitionById(idCompetition);
        if (member != null && competition != null) {
            competition.members.add(member);
            return Response.ok(competition).build();
        }
        return Response.serverError().build();
    }

    @Transactional
    @GET
    @Consumes("application/json")
    @Produces("application/json")
    @Path("/get/{idCompetition}/members")
    @Authenticated
    public Response getMembersByIdComp(Long idCompetition) {
        return Response.ok(Member.findMembersByIdComp(idCompetition)).build();
    }

    @Transactional
    @GET
    @Consumes("application/json")
    @Produces("application/json")
    @Path("/get/{id}")
    @Authenticated
    public Response getCompetitionById(Long id) {
        return Response.ok(Competition.findCompetitionById(id)).build();
    }
}
