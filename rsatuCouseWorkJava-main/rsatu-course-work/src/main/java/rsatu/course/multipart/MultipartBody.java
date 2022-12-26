package rsatu.course.multipart;

import javax.ws.rs.core.MediaType;

import org.jboss.resteasy.reactive.PartType;
import org.jboss.resteasy.reactive.RestForm;

import java.io.File;

public class MultipartBody {

    @RestForm
    public File file;

    @RestForm
    @PartType(MediaType.TEXT_PLAIN)
    public Long idCompetition;

    @RestForm
    @PartType(MediaType.TEXT_PLAIN)
    public String originalName;
}
