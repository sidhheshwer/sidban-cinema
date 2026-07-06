package com.sidban.sidban_movies.services;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sidban.sidban_movies.dto.SidbanResponseDto;

@Service
public class SidbanPicturesService {

    @Value("${sidban.movies.api.key}")
    private String sidbanMoviesApi;

 
    private final Map<Integer, SidbanResponseDto> pageCache =
            new ConcurrentHashMap<>();

    private final Map<Integer, Long> pageCacheTime =
            new ConcurrentHashMap<>();

    private static final long CACHE_DURATION = 1800000; 
    
    @Autowired
   private RestTemplate restTemplate;

       public SidbanPicturesService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<?> sidbanPicturesService(int page) {

        long now = System.currentTimeMillis();
        page = Math.min(page, 30);

       
        if (pageCache.containsKey(page)
                && pageCacheTime.containsKey(page)
                && (now - pageCacheTime.get(page)) < CACHE_DURATION) {

            System.out.println("Returning cached page: " + page);

            return ResponseEntity.ok(pageCache.get(page));
        }

String url =
    "https://api.themoviedb.org/3/discover/movie?api_key="
        + sidbanMoviesApi
        + "&page="
        + page;
        try {

         
            SidbanResponseDto response =
                    restTemplate.getForObject(url, SidbanResponseDto.class);

            if (response != null) {

                pageCache.put(page, response);
                pageCacheTime.put(page, now);

                System.out.println("Cached page: " + page);
            }
           
   
            return ResponseEntity.ok(response);

        } catch (Exception e) {

            System.err.println(
                    "TMDB request failed for page "
                            + page
                            + ": "
                            + e.getMessage());

           
            if (pageCache.containsKey(page)) {

                System.out.println(
                        "Returning cached page "
                                + page
                                + " because TMDB failed");

                return ResponseEntity.ok(pageCache.get(page));
            }

            return ResponseEntity
                    .status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body("TMDB temporarily unavailable. Please try again later.");
        }
    }
}