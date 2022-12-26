package rsatu.course.resource;

import io.quarkus.security.Authenticated;
import rsatu.course.pojo.Lake;

import javax.annotation.security.RolesAllowed;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("api/lake")
public class LakeResource {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/get")
    @Authenticated
    public Response getLakes() {
        return Response.ok(Lake.findAllLakes()).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/insert")
    @Transactional
    @RolesAllowed("admin")
    public Response insertLake(Lake lake) {
        return Response.ok(Lake.insertLake(lake)).build();
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/delete")
    @Transactional
    @RolesAllowed("admin")
    public void deleteLakeById(Long id) {
        Lake.deleteLakeById(id);
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/get/{name}")
    @Authenticated
    public Lake getLakeByName(String name) {
        return Lake.findLakeByName(name);
    }
}
