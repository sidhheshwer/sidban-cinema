package com.sidban.sidban_movies.services;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sidban.sidban_movies.dto.SidbanSeriesDetailsDto;


@Service
public class SidbanSeriesDetailsService {

    @Value("${sidban.movies.api.key}")
    private String sidbanMoviesApi;

     @Autowired
   private RestTemplate restTemplate;

       public SidbanSeriesDetailsService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    

    private final Map<String, SidbanSeriesDetailsDto> cache =
            new ConcurrentHashMap<>();

    private final Map<String, Long> cacheTime =
            new ConcurrentHashMap<>();

    private static final long CACHE_DURATION = 1800000;

 

    public ResponseEntity<?> getSidbanSeriesDetails(String tvId) {

        long now = System.currentTimeMillis();

        String cacheKey =tvId ;

        if (cache.containsKey(cacheKey)
                && cacheTime.containsKey(cacheKey)
                && (now - cacheTime.get(cacheKey))
                        < CACHE_DURATION) {

            return ResponseEntity.ok(
                    cache.get(cacheKey));
        }

        String url =
                "https://api.themoviedb.org/3/tv/"
                        + tvId

                        + "?api_key="
                        + sidbanMoviesApi;

        try {

            SidbanSeriesDetailsDto response =
                    restTemplate.getForObject(
                            url,
                            SidbanSeriesDetailsDto.class);

     if (response != null) {

    cache.put(cacheKey, response);
    cacheTime.put(cacheKey, now);
}



response.getSeasons().forEach(season -> {
    System.out.println(
        "Season " + season.getSeasonNumber()
        + " Episodes: " + season.getEpisodeCount()
    );
});

return ResponseEntity.ok(response);

        } catch (Exception e) {

            if (cache.containsKey(cacheKey)) {

                return ResponseEntity.ok(
                        cache.get(cacheKey));
            }

            return ResponseEntity
                    .status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(
                            "TMDB temporarily unavailable. Please try again later.");
        }
    }
}