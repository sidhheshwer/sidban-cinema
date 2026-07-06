package com.sidban.sidban_movies.services;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.sidban.sidban_movies.dto.SidbanTvSeasonDto;

@Service
public class SidbanTvSeasonService {

    @Value("${sidban.movies.api.key}")
    private String sidbanMoviesApi;

    private final RestTemplate restTemplate;

    private final Map<String, SidbanTvSeasonDto> cache =
            new ConcurrentHashMap<>();

    private final Map<String, Long> cacheTime =
            new ConcurrentHashMap<>();

    private static final long CACHE_DURATION = 1800000;

    public SidbanTvSeasonService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public ResponseEntity<?> getSeasonDetails(
            int tvId,
            int seasonNumber) {

        long now = System.currentTimeMillis();

        String cacheKey =
                tvId + "-" + seasonNumber;

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
                        + "/season/"
                        + seasonNumber
                        + "?api_key="
                        + sidbanMoviesApi;

        try {

            SidbanTvSeasonDto response =
                    restTemplate.getForObject(
                            url,
                            SidbanTvSeasonDto.class);

            if (response != null) {

                cache.put(cacheKey, response);
                cacheTime.put(cacheKey, now);
            }

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