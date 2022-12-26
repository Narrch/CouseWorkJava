package rsatu.course.resource;

import io.quarkus.security.Authenticated;
import rsatu.course.pojo.Fish;
import rsatu.course.pojo.Lake;

import javax.annotation.security.RolesAllowed;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("api/fish")
public class FishResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/get")
    @Authenticated
    public Response getFishes() {
        return Response.ok(Fish.findAllFishes()).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/insert")
    @Transactional
    @RolesAllowed("admin")
    public Response insertFish(Fish fish) {
        return Response.ok(Fish.insertFish(fish)).build();
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/delete")
    @Transactional
    @RolesAllowed("admin")
    public void deleteFishById(Long id) {
        Fish.deleteFishById(id);
    }
}
