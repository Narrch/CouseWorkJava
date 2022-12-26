package rsatu.course.resource;

import io.quarkus.security.Authenticated;
import rsatu.course.pojo.Fish;
import rsatu.course.pojo.Lake;
import rsatu.course.pojo.Lure;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("api/lure")
public class LureResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/get")
    @Authenticated
    public Response getLures() {
        return Response.ok(Lure.findAllLures()).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/insert")
    @Transactional
    @RolesAllowed("admin")
    public Response insertLure(Lure lure) {
        return Response.ok(Lure.insertLure(lure)).build();
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/delete")
    @Transactional
    @RolesAllowed("admin")
    public void deleteLureById(Long id) {
        Lure.deleteLureById(id);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/get/{name}")
    @Authenticated
    public Lure getLureByName(String name) {
        return Lure.findLureByName(name);
    }
}
