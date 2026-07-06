package com.sidban.sidban_movies.entities;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sidban.sidban_movies.dto.SidbanAIResponseMovie;


@Service
public class SidbanMovieScraper {

    @Value("${sidban.omdb.api.key}")
    private String sidbanMovieDetailsApi;


    public SidbanAIResponseMovie getMovieDetails(String title, String type) {
        try {
            if ("tv".equalsIgnoreCase(type)) {
                type = "series";
            }

            String url = "http://www.omdbapi.com/?t="
                    + title.replace(" ", "%20")
                    + "&type=" + type
                    + "&apikey=" + sidbanMovieDetailsApi;

            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(url, String.class);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode movie = mapper.readTree(response);
      

            SidbanAIResponseMovie dto = new SidbanAIResponseMovie();

            dto.setTitle(movie.path("Title").asText(""));
            dto.setYear(movie.path("Year").asText(""));
            dto.setReleased(movie.path("Released").asText(""));
            dto.setRuntime(movie.path("Runtime").asText(""));
            dto.setGenre(movie.path("Genre").asText(""));
            dto.setDirector(movie.path("Director").asText(""));
            dto.setWriter(movie.path("Writer").asText(""));
            dto.setActors(movie.path("Actors").asText(""));
            dto.setProduction(movie.path("Production").asText(""));
            dto.setAwards(movie.path("Awards").asText(""));
            dto.setImdbRating(movie.path("imdbRating").asText(""));
            dto.setPlot(movie.path("Plot").asText(""));
            dto.setPoster(movie.path("Poster").asText(""));

            JsonNode ratings = movie.path("Ratings");
            String rotten = "";

            if (ratings.isArray()) {
                for (JsonNode rating : ratings) {
                    if ("Rotten Tomatoes".equals(rating.path("Source").asText())) {
                        rotten = rating.path("Value").asText();
                        break;
                    }
                }
            }

            dto.setRottenTomatoesRating(rotten);

            return dto;

        } catch (Exception e) {
            return null;
        }
    }
}